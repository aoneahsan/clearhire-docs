import { useMemo, useState, type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { useHistory, useLocation } from '@docusaurus/router';

import type { DiscoveryPageData } from '../../plugins/discoveryFeed';
import styles from './styles.module.css';

/** Sidebar order and labels, so the cards read in the order the docs are read. */
const GROUPS: ReadonlyArray<{ id: string; label: string; icon: string }> = [
  { id: 'start', label: 'Start here', icon: 'M4 10h12M10 4l6 6-6 6' },
  { id: 'getting-started', label: 'Getting Started', icon: 'M5 15V5l10 5z' },
  { id: 'features', label: 'Features', icon: 'M3 3h6v6H3zM11 3h6v6h-6zM3 11h6v6H3zM11 11h6v6h-6z' },
  { id: 'guides', label: 'Guides', icon: 'M5 2.5h7l3 3v12H5zM12 2.5v3h3' },
];

const MACHINE_FILES: ReadonlyArray<{ href: string; label: string; hint: string }> = [
  { href: 'pathname:///sitemap.xml', label: 'sitemap.xml', hint: 'Every page with the date its words last changed.' },
  { href: 'pathname:///feed.xml', label: 'feed.xml', hint: 'RSS of documentation updates, newest first.' },
  { href: 'pathname:///llms.txt', label: 'llms.txt', hint: 'A plain-text guide to these docs for AI assistants.' },
];

/** Lowercase, strip accents and punctuation: the form both sides of a match are compared in. */
function normalize(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/** True when `a` and `b` differ by at most one edit (insert, delete or substitute). */
function withinOneEdit(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i += 1;
      j += 1;
      continue;
    }
    edits += 1;
    if (edits > 1) return false;
    if (a.length > b.length) i += 1;
    else if (b.length > a.length) j += 1;
    else {
      i += 1;
      j += 1;
    }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}

/** Every query word must appear in the card's text, or sit one typo away from one of its words. */
function matches(haystack: string, query: string): boolean {
  const words = normalize(haystack).split(' ');
  return normalize(query)
    .split(' ')
    .filter(Boolean)
    .every((term) => words.some((word) => word.includes(term) || (term.length > 3 && withinOneEdit(word, term))));
}

/** The readable sitemap: every documentation page as a card, grouped as the sidebar groups them. */
export default function SitemapPage({ data }: { data: DiscoveryPageData }): ReactNode {
  const location = useLocation();
  const history = useHistory();
  const [query, setQuery] = useState(() => new URLSearchParams(location.search).get('q') ?? '');

  const onQuery = (value: string): void => {
    setQuery(value);
    const params = new URLSearchParams(location.search);
    if (value === '') params.delete('q');
    else params.set('q', value);
    const search = params.toString();
    history.replace({ search: search === '' ? '' : `?${search}` });
  };

  const visible = useMemo(
    () => data.items.filter((item) => query === '' || matches(`${item.title} ${item.description} ${item.tags.join(' ')}`, query)),
    [data.items, query],
  );

  return (
    <Layout title="Sitemap" description="Every page of the ClearHire documentation, grouped and searchable.">
      <main className="container margin-vert--lg">
        <h1>Sitemap</h1>
        <p>Every page of the ClearHire documentation, grouped as the sidebar groups them.</p>

        <ul className={styles.machine}>
          {MACHINE_FILES.map((file) => (
            <li key={file.href}>
              <Link href={file.href}>{file.label}</Link> <span className={styles.hint}>{file.hint}</span>
            </li>
          ))}
        </ul>

        <label className={styles.searchLabel} htmlFor="sitemap-search">
          Filter pages
        </label>
        <input
          id="sitemap-search"
          className={styles.search}
          type="search"
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          placeholder="resume, export, verification…"
        />
        <p className={styles.count} role="status">
          {visible.length} of {data.items.length} pages
        </p>

        {GROUPS.map((group) => {
          const cards = visible.filter((item) => item.group === group.id);
          if (cards.length === 0) return null;
          return (
            <section key={group.id} className={styles.group}>
              <h2 className={styles.groupTitle}>
                <svg aria-hidden="true" viewBox="0 0 20 20" className={styles.icon}>
                  <path d={group.icon} />
                </svg>
                {group.label}
              </h2>
              <ul className={styles.cards}>
                {cards.map((item) => (
                  <li key={item.permalink} className={styles.card}>
                    <Link to={item.permalink} className={styles.cardTitle}>
                      {item.title}
                    </Link>
                    <p className={styles.cardBody}>{item.description}</p>
                    {item.tags.length > 0 ? (
                      <ul className={styles.tags}>
                        {item.tags.map((tag) => (
                          <li key={tag} className={styles.tag}>
                            {tag}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </main>
    </Layout>
  );
}
