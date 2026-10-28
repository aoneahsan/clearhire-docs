import type { ComponentProps, ReactNode } from 'react';
import Head from '@docusaurus/Head';
import SearchPage from '@theme-original/SearchPage';

/**
 * The local-search results page, with a real robots noindex. The theme's own tag is
 * `property="robots"`, which crawlers ignore, so /search stayed indexable while it was left
 * out of the sitemap.
 */
export default function SearchPageWrapper(props: ComponentProps<typeof SearchPage>): ReactNode {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <SearchPage {...props} />
    </>
  );
}
