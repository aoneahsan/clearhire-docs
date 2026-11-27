/**
 * THE SEO CONTRACT, READ OFF `build/` (clearhire-docs#1, 2026-11-27): what Google, Bing and an AI crawler ask of the
 * live docs site, asked of the files GitHub Pages will serve. Run after `yarn build` with `yarn seo:contract`.
 *
 * Owner law it holds (2026-11-27): GitHub Pages docs are slashed (`trailingSlash: true`, `page/index.html`); no public
 * page carries `noindex`; broken links fail the build; no generated tag pages; FAQ markup equals the visible FAQ.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

import config from '../../docusaurus.config';
import { faqPairs } from '../plugins/faqSchema';

const BUILD = join(process.cwd(), 'build');
const ORIGIN = 'https://clearhire-docs.aoneahsan.com';
const read = (file: string): string => readFileSync(join(BUILD, file), 'utf8');

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [relative(BUILD, full)];
  });
}

/** `https://host/a/b/` is served from `a/b/index.html`. */
const fileFor = (url: string): string => `${url.slice(ORIGIN.length + 1)}index.html`;
const count = (html: string, pattern: RegExp): number => html.match(pattern)?.length ?? 0;
const ldBlocks = (html: string): string[] =>
  [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1] ?? '');

const built = existsSync(join(BUILD, 'sitemap.xml'));

describe('the docs config', () => {
  it('is slashed for GitHub Pages and refuses broken links (SA-P26)', () => {
    expect(config.trailingSlash).toBe(true);
    expect(config.onBrokenLinks).toBe('throw');
    expect(config.onBrokenAnchors).toBe('throw');
  });
});

describe('the built docs site, as a crawler reads it', () => {
  const sitemap = built ? read('sitemap.xml') : '';
  const submitted = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1] ?? '');

  it('submits every URL in the slashed form, each one a built page', () => {
    expect(built, 'build/sitemap.xml is missing — run `yarn build` first').toBe(true);
    expect(submitted.length).toBeGreaterThan(50);
    expect(submitted.filter((url) => !url.startsWith(`${ORIGIN}/`) || !url.endsWith('/'))).toStrictEqual([]);
    expect(submitted.filter((url) => !existsSync(join(BUILD, fileFor(url))))).toStrictEqual([]);
  });

  it('writes no page as page.html, which GitHub Pages would 404 with a slash', () => {
    const flat = walk(BUILD).filter((file) => file.endsWith('.html') && !file.endsWith('index.html') && file !== '404.html');
    expect(flat).toStrictEqual([]);
  });

  it('gives every page one title, one description, one self-canonical, and no noindex', () => {
    const wrong: string[] = [];
    for (const url of submitted) {
      const html = read(fileFor(url));
      const canonicals = [...html.matchAll(/<link[^>]*rel=canonical[^>]*href=([^ >]+)/g)].map((m) => m[1]?.replace(/"/g, ''));
      if (count(html, /<title[\s>]/g) !== 1) wrong.push(`${url}: title count`);
      if (count(html, /<meta[^>]*name=description[\s>]/g) !== 1) wrong.push(`${url}: description count`);
      if (canonicals.length !== 1 || canonicals[0] !== url) wrong.push(`${url}: canonical ${canonicals.join(',')}`);
      if (/<meta[^>]*name=robots[^>]*noindex/i.test(html)) wrong.push(`${url}: noindex`);
    }
    expect(wrong).toStrictEqual([]);
  });

  it('parses every JSON-LD block and declares no SearchAction', () => {
    const wrong: string[] = [];
    for (const url of submitted) {
      for (const block of ldBlocks(read(fileFor(url)))) {
        try {
          if (/SearchAction/.test(JSON.stringify(JSON.parse(block)))) wrong.push(`${url}: SearchAction`);
        } catch {
          wrong.push(`${url}: JSON-LD does not parse`);
        }
      }
    }
    expect(wrong).toStrictEqual([]);
  });

  it('marks up the FAQ page with exactly the questions and answers it shows (SA-P30)', () => {
    const html = read('faq/index.html');
    const faq = ldBlocks(html)
      .map((block) => JSON.parse(block) as { '@type'?: string; mainEntity?: { name: string; acceptedAnswer: { text: string } }[] })
      .find((node) => node['@type'] === 'FAQPage');
    const shown = faqPairs(html);
    expect(shown.length).toBeGreaterThanOrEqual(10);
    expect(faq?.mainEntity?.map((q) => ({ name: q.name, text: q.acceptedAnswer.text }))).toStrictEqual(shown);
  });

  it('publishes no generated tag pages (SA-P32)', () => {
    expect(walk(BUILD).filter((file) => /(^|\/)tags\//.test(file))).toStrictEqual([]);
  });

  it('points every docs link in llms.txt at a built page, in the slashed form', () => {
    const links = [...read('llms.txt').matchAll(/\((https:\/\/clearhire-docs\.aoneahsan\.com\/[^)]*)\)/g)].map((m) => m[1] ?? '');
    expect(links.length).toBeGreaterThan(10);
    expect(links.filter((url) => !url.endsWith('/') || !existsSync(join(BUILD, fileFor(url))))).toStrictEqual([]);
  });
});
