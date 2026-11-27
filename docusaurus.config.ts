import { existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import discoveryFeed from './src/plugins/discoveryFeed';
import faqSchema from './src/plugins/faqSchema';
import { BLOG_DESCRIPTION, BLOG_PATH, BLOG_TITLE } from './src/data/blog';
import {APPS_LASTMOD, OTHER_PLATFORMS, platformHref} from './src/data/platforms';

// ---------------------------------------------------------------------------
// ClearHire — Documentation site config
// Built by: the ClearHire team (https://aoneahsan.com)
// App: https://clearhire.aoneahsan.com · Play Store:
// https://play.google.com/store/apps/details?id=com.aoneahsan.clearhire
// ---------------------------------------------------------------------------

const SITE_URL = 'https://clearhire-docs.aoneahsan.com';
const APP_URL = platformHref('web');
const ORG_ID = `${APP_URL}/#organization`;
const PLAY_URL = platformHref('android');

/**
 * Whether blog/ holds a post yet. Until it does, the blog stays off: an empty blog page would sit in sitemap.xml with
 * nothing on it, and a Blog link would point at it. The first post added to blog/ turns on the blog, its feeds, its
 * search index, its sitemap entries, its cards on /sitemap and /feed, and the Blog links in the navbar and the footer.
 */
const BLOG_DIR = fileURLToPath(new URL('./blog', import.meta.url));
const HAS_POSTS = existsSync(BLOG_DIR) && readdirSync(BLOG_DIR).some((name) => /\.mdx?$/.test(name));

const config: Config = {
  future: {
    v4: true,
    faster: true,
  },

  title: 'ClearHire Docs',
  tagline:
    'Build resumes, prove your employment history, and track applications.',
  favicon: 'img/favicon.svg',

  url: SITE_URL,
  baseUrl: '/',

  organizationName: 'aoneahsan',
  projectName: 'clearhire-docs',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',

  // SEO + AI-citability head tags layered on top of Docusaurus per-page meta.
  // The JSON-LD payloads (WebSite, Organization, SoftwareApplication) help
  // Google Rich Results, Perplexity, ChatGPT, and Gemini extract structured
  // entity data when citing ClearHire docs.
  headTags: [
    { tagName: 'meta', attributes: { name: 'yandex-verification', content: 'bfb02722189028cf' } },
    {
      tagName: 'link',
      attributes: {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'ClearHire documentation updates',
        href: `${SITE_URL}/feed.xml`,
      },
    },
    {
      tagName: 'meta',
      attributes: { name: 'application-name', content: 'ClearHire Docs' },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'apple-mobile-web-app-title',
        content: 'ClearHire Docs',
      },
    },
    {
      tagName: 'meta',
      attributes: { name: 'theme-color', content: '#0EA5E9' },
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'ClearHire Documentation',
        url: SITE_URL,
        description:
          'Documentation for ClearHire — a resume builder and verified-employment job platform. Build CVs from a structured profile, request employment verification from past employers, search jobs, track applications, and write mutual reviews. Built by the ClearHire team.',
        inLanguage: 'en',
        publisher: { '@type': 'Organization', '@id': ORG_ID, name: 'ClearHire' },
      }),
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'ClearHire',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Android, Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        url: APP_URL,
        downloadUrl: PLAY_URL,
        sameAs: [APP_URL, PLAY_URL],
        author: { '@type': 'Organization', '@id': ORG_ID, name: 'ClearHire' },
        description:
          'Resume builder and verified-employment job platform. Create professional CVs from one structured profile, request and grant employment verification, search jobs, track applications, and exchange mutual reviews between candidates and companies.',
      }),
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': ORG_ID,
        name: 'ClearHire',
        url: `${APP_URL}/`,
        email: 'aoneahsan@gmail.com',
        founder: {
          '@type': 'Person',
          '@id': `${APP_URL}/#developer`,
          name: 'Ahsan Mahmood',
          alternateName: 'aoneahsan',
          url: 'https://aoneahsan.com',
          sameAs: [
            'https://linkedin.com/in/aoneahsan',
            'https://github.com/aoneahsan',
            'https://www.npmjs.com/~aoneahsan',
          ],
        },
      }),
    },
  ],

  i18n: { defaultLocale: 'en', locales: ['en'] },

  /* 🔴 SLASHED, because GitHub Pages serves `page/index.html` with a real 301 from `/page` and 404s `/page/` when the
     build writes `page.html` (SA-P26, clearhire-docs#1, owner 2026-11-27). Canonicals, the sitemap and every internal
     link follow this one form. */
  trailingSlash: true,

  markdown: {
    mermaid: true,
    hooks: { onBrokenMarkdownLinks: 'throw' },
  },

  themes: [
    '@docusaurus/theme-mermaid',
    // Offline/local search — this is a PUBLIC docs site with no Algolia account,
    // so the index is built at compile time and shipped with the static output.
    // Note: search only works against a real build (`yarn build && yarn serve`),
    // not `yarn start`.
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexDocs: true,
        indexPages: true,
        indexBlog: HAS_POSTS,
        blogRouteBasePath: BLOG_PATH,
        docsRouteBasePath: '/',
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchBarShortcut: true,
        searchBarShortcutHint: true,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // `docs/` is BOTH the published content dir and the home of the
          // fixed-path internal file docs/MANUAL-TASKS.md. Keep the path (the
          // global rule fixes it) but never publish it — this repo is public.
          // NOTE: `exclude` REPLACES the plugin defaults, so they are restated.
          exclude: [
            '**/_*.{js,jsx,ts,tsx,md,mdx}',
            '**/_*/**',
            '**/*.test.{js,jsx,ts,tsx}',
            '**/__tests__/**',
            'MANUAL-TASKS.md',
            // docs/PACKAGES.md is the fleet's fixed-path dependency record, never a published page.
            'PACKAGES.md',
            // 🔴 `tracking/` is the content tracker — an internal record of which page has been
            //    walked against which wave. It is not documentation and this repo is public.
            'tracking/**',
            // 🔴 `story/**` is excluded ahead of the story surfaces landing (part ST). The Story
            //    Bible, the voice fingerprint and every draft live under `docs/story/` in the APP
            //    repo, and if that convention is ever mirrored here the drafts must not publish.
            //    Excluding a directory that does not exist yet costs nothing; discovering the
            //    omission after a build has published somebody's working notes costs a lot.
            'story/**',
            // `search-consoles/` is the fleet's fixed-path console and fix record, never a published page.
            'search-consoles/**',
          ],
          routeBasePath: '/',
          editUrl: 'https://github.com/aoneahsan/clearhire-docs/edit/main/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
          breadcrumbs: true,
          /* No tag pages: a generated tag list only repeats the pages it lists (SA-P32). An inline tag fails the
             build rather than quietly publishing one. */
          tags: false,
          onInlineTags: 'throw',
        },
        blog: HAS_POSTS && {
          path: 'blog',
          routeBasePath: BLOG_PATH.slice(1),
          blogTitle: BLOG_TITLE,
          blogDescription: BLOG_DESCRIPTION,
          blogSidebarTitle: 'Recent posts',
          blogSidebarCount: 10,
          postsPerPage: 10,
          showReadingTime: false,
          // A post's last update comes from git: shown under the post, and its sitemap lastmod. No name is shown.
          showLastUpdateTime: true,
          showLastUpdateAuthor: false,
          // Every author and tag is defined once, in blog/authors.yml (and blog/tags.yml when a post uses one).
          onInlineAuthors: 'throw',
          onInlineTags: 'throw',
          onUntruncatedBlogPosts: 'throw',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
            title: BLOG_TITLE,
            description: BLOG_DESCRIPTION,
            copyright: 'Made by the ClearHire team.',
            language: 'en-GB',
          },
        },
        theme: { customCss: './src/css/custom.css' },
        sitemap: {
          lastmod: 'date',
          changefreq: null,
          priority: null,
          // /search is a utility page with no indexable content of its own. The blog's tag, author, archive and later
          // list pages only repeat its posts; each post is listed once, by its own URL.
          ignorePatterns: ['/search', '/blog/tags/**', '/blog/authors/**', '/blog/archive', '/blog/page/**'],
          /* A lastmod on EVERY URL. The doc pages and blog posts carry their git date; the pages that list them
             (/, /sitemap, /feed) take the newest date of what they list, and /blog the newest of its posts. An
             undated URL fails the build, so commit a page or a post before building. */
          createSitemapItems: async ({ defaultCreateSitemapItems, ...params }) => {
            const items = await defaultCreateSitemapItems(params);
            const blogUrl = `${SITE_URL}${BLOG_PATH}/`;
            let newest: string | null = null;
            let newestPost: string | null = null;
            for (const item of items) {
              if (item.lastmod && (newest === null || item.lastmod > newest)) newest = item.lastmod;
              if (item.lastmod && item.url.startsWith(blogUrl) && item.url !== blogUrl && (newestPost === null || item.lastmod > newestPost)) {
                newestPost = item.lastmod;
              }
            }
            if (newest === null) throw new Error('sitemap: no dated page');
            const listing = new Set([`${SITE_URL}/`, `${SITE_URL}/sitemap/`, `${SITE_URL}/feed/`]);
            const undated = items.filter(
              (item) =>
                !item.lastmod &&
                !listing.has(item.url) &&
                item.url !== `${SITE_URL}/apps/` &&
                !(item.url === blogUrl && newestPost !== null),
            );
            if (undated.length > 0) throw new Error(`sitemap: undated ${undated.map((i) => i.url).join(', ')}`);
            const lastmod: string = newest;
            const listedDate = (url: string): string =>
              url === `${SITE_URL}/apps/` ? APPS_LASTMOD : url === blogUrl && newestPost !== null ? newestPost : lastmod;
            return items.map((item) => (item.lastmod ? item : { ...item, lastmod: listedDate(item.url) }));
          },
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [discoveryFeed, faqSchema],

  themeConfig: {
    image: 'img/social-card.png',
    metadata: [
      {
        name: 'description',
        content:
          'Documentation for ClearHire: build resumes, get past roles countersigned, search jobs and track applications. Web and Android. By the ClearHire team.',
      },
      {
        name: 'keywords',
        content:
          'clearhire, resume builder, cv builder, employment verification, verified employment, job search, applicant tracking, ats resume checker, cover letter generator, mutual reviews, job application tracker, career tools',
      },
      { name: 'author', content: 'The ClearHire team' },
      {
        name: 'robots',
        content:
          'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:creator', content: '@aoneahsan' },
      { name: 'twitter:site', content: '@aoneahsan' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'ClearHire Docs' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
    ],
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: { hideable: true, autoCollapseCategories: true },
    },
    navbar: {
      title: 'ClearHire',
      logo: {
        alt: 'ClearHire logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo.svg',
        width: 32,
        height: 32,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'mainSidebar',
          position: 'left',
          label: 'Docs',
        },
        { to: '/getting-started/quick-start', label: 'Get Started', position: 'left' },
        { to: '/faq', label: 'FAQ', position: 'left' },
        ...(HAS_POSTS ? [{ to: BLOG_PATH, label: 'Blog', position: 'left' as const }] : []),
        { to: '/about-the-author', label: 'The team', position: 'right' },
        {
          type: 'dropdown',
          label: 'Get ClearHire',
          position: 'right',
          items: [
            ...OTHER_PLATFORMS.map((platform) => ({ label: platform.name, href: platform.href })),
            { label: 'All apps', to: '/apps' },
          ],
        },
        {
          href: 'https://github.com/aoneahsan/clearhire-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Get ClearHire',
          items: [
            ...OTHER_PLATFORMS.map((platform) => ({ label: platform.name, href: platform.href })),
            { label: 'All apps', to: '/apps' },
          ],
        },
        {
          title: 'Documentation',
          items: [
            { label: 'Introduction', to: '/intro' },
            { label: 'Quick Start', to: '/getting-started/quick-start' },
            { label: 'Create Your Profile', to: '/getting-started/create-your-profile' },
            { label: 'FAQ', to: '/faq' },
          ],
        },
        {
          title: 'Features',
          items: [
            { label: 'Resume Builder', to: '/features/resume-builder' },
            { label: 'Employment Verification', to: '/features/employment-verification' },
            { label: 'Job Search', to: '/features/job-search' },
            { label: 'For Companies', to: '/features/for-companies' },
          ],
        },
        {
          title: 'ClearHire',
          items: [
            { label: 'Privacy', to: '/privacy' },
            { label: 'Changelog', to: '/changelog' },
            ...(HAS_POSTS ? [{ label: 'Blog', to: BLOG_PATH }] : []),
            { label: 'Sitemap', to: '/sitemap' },
            { label: 'Updates', to: '/feed' },
          ],
        },
        {
          title: 'Built by the ClearHire team',
          items: [
            { label: 'aoneahsan.com', href: 'https://aoneahsan.com' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/aoneahsan' },
            { label: 'GitHub', href: 'https://github.com/aoneahsan' },
            { label: 'npm packages', href: 'https://www.npmjs.com/~aoneahsan' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} an independent developer, the ClearHire team. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'typescript', 'diff'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
