import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import type { DiscoveryPageData } from '../../plugins/discoveryFeed';
import styles from '../SitemapPage/styles.module.css';

const DATE = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** The readable feed: the same pages as feed.xml, newest change first. */
export default function FeedPage({ data }: { data: DiscoveryPageData }): ReactNode {
  return (
    <Layout title="Updates" description="ClearHire documentation pages, newest change first, the same list as feed.xml.">
      <main className="container margin-vert--lg">
        <h1>Updates</h1>
        <p>
          The documentation pages, newest change first. Subscribe with{' '}
          <Link href="pathname:///feed.xml">feed.xml</Link> in any RSS reader.
        </p>
        <ol className={styles.feed}>
          {data.items.map((item) => (
            <li key={item.permalink}>
              <time className={styles.date} dateTime={item.updatedAt}>
                {DATE.format(new Date(item.updatedAt))}
              </time>
              <Link to={item.permalink} className={styles.cardTitle}>
                {item.title}
              </Link>
              <p className={styles.cardBody}>{item.description}</p>
            </li>
          ))}
        </ol>
      </main>
    </Layout>
  );
}
