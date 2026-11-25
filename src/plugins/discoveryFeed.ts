import { readdirSync, readFileSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

import type { BlogContent } from '@docusaurus/plugin-content-blog';
import type { LoadedContent } from '@docusaurus/plugin-content-docs';
import type { AllContent, LoadContext, Plugin } from '@docusaurus/types';

/**
 * Docusaurus writes every route module's path into the client bundle, so the absolute path createData returns
 * would publish this machine's folders and give each machine different chunk names. addRoute gets the alias.
 */
function generatedModule(generatedFilesDir: string, file: string): string {
  return `@generated/${relative(generatedFilesDir, file).split(sep).join('/')}`;
}

/** Fails the build when any client bundle still carries this site's absolute path. */
function assertNoLocalPaths(outDir: string, siteDir: string): void {
  const jsDir = join(outDir, 'assets', 'js');
  const forms = [siteDir.split(sep).join('/'), siteDir.split(sep).join('\\\\')];
  for (const file of readdirSync(jsDir).filter((name) => name.endsWith('.js'))) {
    const text = readFileSync(join(jsDir, file), 'utf8');
    const found = forms.find((form) => text.includes(form));
    if (found) throw new Error(`${file} carries the local path ${found}: pass createData paths to addRoute through generatedModule()`);
  }
}

type FeedItem = {
  title: string;
  description: string;
  permalink: string;
  /** A doc's last change, or a blog post's publication day. */
  updatedAt: Date;
  /** The first path segment, or `start` for a top-level page; `blog` for a post. Groups the `/sitemap` cards. */
  group: string;
  tags: string[];
};

/** What the `/sitemap` and `/feed` pages receive as their `data` module. */
export type DiscoveryPageData = {
  items: Array<Omit<FeedItem, 'updatedAt'> & { updatedAt: string }>;
  newest: string;
  /** How many of the items are blog posts: none until the first post is published. */
  posts: number;
};

export default function discoveryFeed({ generatedFilesDir, siteDir }: LoadContext): Plugin {
  let items: FeedItem[] = [];
  return {
    name: 'discovery-feed',
    async allContentLoaded({ allContent, actions }) {
      const docs = docsFeedItems(allContent);
      if (docs.length === 0) {
        throw new Error('discovery-feed: no dated documentation pages were found');
      }
      const posts = blogFeedItems(allContent);
      items = sortNewestFirst([...docs, ...posts]);
      /* The readable twins of sitemap.xml and feed.xml (rules/project-config.md): every frontend ships
         /sitemap and /feed as pages, prerendered so the whole list reads with no script. */
      const pageData: DiscoveryPageData = {
        items: items.map((item) => ({ ...item, updatedAt: item.updatedAt.toISOString() })),
        newest: items[0]!.updatedAt.toISOString(),
        posts: posts.length,
      };
      const data = generatedModule(generatedFilesDir, await actions.createData('discovery-pages.json', JSON.stringify(pageData)));
      actions.addRoute({ path: '/sitemap', exact: true, component: '@site/src/components/SitemapPage', modules: { data } });
      actions.addRoute({ path: '/feed', exact: true, component: '@site/src/components/FeedPage', modules: { data } });
    },
    async postBuild({ outDir, siteConfig }) {
      assertNoLocalPaths(outDir, siteDir);
      const siteUrl = new URL(siteConfig.baseUrl, siteConfig.url).toString();
      await writeFile(
        join(outDir, 'feed.xml'),
        renderFeed(items, {
          title: siteConfig.title,
          description: siteConfig.tagline,
          siteUrl,
        }),
        'utf8',
      );
    },
  };
}

function docsFeedItems(allContent: AllContent): FeedItem[] {
  const instances = allContent['docusaurus-plugin-content-docs'] ?? {};
  const items = Object.values(instances).flatMap((raw) => {
    const content = raw as LoadedContent;
    const versions = content.loadedVersions.filter((version) => version.isLast);
    return versions.flatMap((version) =>
      version.docs.flatMap((doc) => {
        if (doc.draft || doc.unlisted) return [];
        const frontMatter = doc.frontMatter as {
          last_update?: { date?: Date | string };
        };
        const updatedAt = parseDate(frontMatter.last_update?.date ?? doc.lastUpdatedAt);
        const segments = doc.permalink.split('/').filter(Boolean);
        return updatedAt
          ? [{
              title: doc.title,
              description: doc.description,
              permalink: doc.permalink,
              updatedAt,
              group: segments.length > 1 ? segments[0]! : 'start',
              tags: doc.tags.map((tag) => tag.label),
            }]
          : [];
      }),
    );
  });
  return sortNewestFirst(items);
}

/**
 * The blog posts the blog plugin loaded, dated by the day each was published. Drafts are already gone from a
 * production build; an unlisted post stays out here too, as it does from the blog's own lists. Empty while the blog
 * is off (no post in blog/ yet).
 *
 * @param allContent - every plugin's loaded content
 * @returns one item per listed post
 */
function blogFeedItems(allContent: AllContent): FeedItem[] {
  const instances = (allContent['docusaurus-plugin-content-blog'] ?? {}) as Record<string, BlogContent | undefined>;
  return Object.values(instances)
    .flatMap((content) => content?.blogPosts ?? [])
    .filter((post) => !post.metadata.unlisted)
    .flatMap(({ metadata }) => {
      const updatedAt = parseDate(metadata.date);
      return updatedAt
        ? [{
            title: metadata.title,
            description: metadata.description,
            permalink: metadata.permalink,
            updatedAt,
            group: 'blog',
            tags: metadata.tags.map((tag) => tag.label),
          }]
        : [];
    });
}

function sortNewestFirst(items: FeedItem[]): FeedItem[] {
  return items.sort(
    (left, right) =>
      right.updatedAt.getTime() - left.updatedAt.getTime() ||
      left.permalink.localeCompare(right.permalink),
  );
}

function renderFeed(
  items: FeedItem[],
  site: { title: string; description: string; siteUrl: string },
): string {
  const newest = items[0];
  if (!newest) throw new Error('discovery-feed: refusing to render an empty feed');
  const entries = items
    .map((item) => {
      const permalink = new URL(item.permalink, site.siteUrl).toString();
      return `    <item>
      <title>${xml(item.title)}</title>
      <link>${xml(permalink)}</link>
      <guid isPermaLink="true">${xml(permalink)}</guid>
      <pubDate>${item.updatedAt.toUTCString()}</pubDate>
      <description><![CDATA[${cdata(item.description)}]]></description>
    </item>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(site.title)}</title>
    <link>${xml(site.siteUrl)}</link>
    <description><![CDATA[${cdata(site.description)}]]></description>
    <language>en</language>
    <lastBuildDate>${newest.updatedAt.toUTCString()}</lastBuildDate>
    <atom:link href="${xml(new URL('feed.xml', site.siteUrl).toString())}" rel="self" type="application/rss+xml" />
${entries}
  </channel>
</rss>
`;
}

function parseDate(value: Date | string | number | null | undefined): Date | null {
  if (value === null || value === undefined || value === '') return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function xml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function cdata(value: string): string {
  return value.replaceAll(']]>', ']]]]><![CDATA[>');
}
