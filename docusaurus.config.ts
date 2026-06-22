import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// ---------------------------------------------------------------------------
// ClearHire — Documentation site config
// Author: Ahsan Mahmood (https://aoneahsan.com)
// App: https://clearhire.aoneahsan.com · Play Store:
// https://play.google.com/store/apps/details?id=com.aoneahsan.clearhire
// ---------------------------------------------------------------------------

const SITE_URL = 'https://clearhire-docs.aoneahsan.com';
const APP_URL = 'https://clearhire.aoneahsan.com';
const PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.aoneahsan.clearhire';

const config: Config = {
  title: 'ClearHire Docs',
  tagline:
    'Build verified resumes, prove your employment history, and apply with confidence.',
  favicon: 'img/favicon.svg',

  url: SITE_URL,
  baseUrl: '/',

  organizationName: 'aoneahsan',
  projectName: 'clearhire-docs',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',

  // SEO + AI-citability head tags layered on top of Docusaurus per-page meta.
  // The JSON-LD payloads (WebSite, Organization, SoftwareApplication) help
  // Google Rich Results, Perplexity, ChatGPT, and Gemini extract structured
  // entity data when citing ClearHire docs.
  headTags: [
    {
      tagName: 'link',
      attributes: { rel: 'canonical', href: `${SITE_URL}/` },
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
          'Documentation for ClearHire — a resume builder and verified-employment job platform. Build CVs from a structured profile, request employment verification from past employers, search jobs, track applications, and write mutual reviews. Author: Ahsan Mahmood.',
        inLanguage: 'en',
        publisher: {
          '@type': 'Person',
          name: 'Ahsan Mahmood',
          url: 'https://aoneahsan.com',
          email: 'aoneahsan@gmail.com',
          sameAs: [
            'https://linkedin.com/in/aoneahsan',
            'https://github.com/aoneahsan',
            'https://www.npmjs.com/~aoneahsan',
          ],
        },
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
        author: {
          '@type': 'Person',
          name: 'Ahsan Mahmood',
          url: 'https://aoneahsan.com',
        },
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
        name: 'Ahsan Mahmood',
        alternateName: 'aoneahsan',
        url: 'https://aoneahsan.com',
        email: 'aoneahsan@gmail.com',
        sameAs: [
          'https://linkedin.com/in/aoneahsan',
          'https://github.com/aoneahsan',
          'https://www.npmjs.com/~aoneahsan',
          'https://aoneahsan.com',
        ],
        founder: { '@type': 'Person', name: 'Ahsan Mahmood' },
      }),
    },
  ],

  i18n: { defaultLocale: 'en', locales: ['en'] },

  trailingSlash: false,

  markdown: {
    mermaid: true,
    hooks: { onBrokenMarkdownLinks: 'warn' },
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: 'https://github.com/aoneahsan/clearhire-docs/edit/main/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
          breadcrumbs: true,
        },
        blog: false,
        theme: { customCss: './src/css/custom.css' },
        sitemap: { changefreq: 'weekly', priority: 0.7, lastmod: 'date' },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.svg',
    metadata: [
      {
        name: 'description',
        content:
          'Documentation for ClearHire — build verified resumes, prove your employment history, search jobs, and track applications. Free, ad-supported by first-party promotions only. Maintained by Ahsan Mahmood.',
      },
      {
        name: 'keywords',
        content:
          'clearhire, resume builder, cv builder, employment verification, verified employment, job search, applicant tracking, ats resume checker, cover letter generator, mutual reviews, job application tracker, career tools, free resume builder',
      },
      { name: 'author', content: 'Ahsan Mahmood' },
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
      { property: 'article:author', content: 'Ahsan Mahmood' },
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
        { to: '/about-the-author', label: 'Author', position: 'right' },
        { href: APP_URL, label: 'Open App', position: 'right' },
        { href: PLAY_URL, label: 'Google Play', position: 'right' },
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
            { label: 'Open the app', href: APP_URL },
            { label: 'Get it on Google Play', href: PLAY_URL },
            { label: 'Privacy', to: '/privacy' },
            { label: 'Changelog', to: '/changelog' },
          ],
        },
        {
          title: 'Built by Ahsan Mahmood',
          items: [
            { label: 'aoneahsan.com', href: 'https://aoneahsan.com' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/aoneahsan' },
            { label: 'GitHub', href: 'https://github.com/aoneahsan' },
            { label: 'npm packages', href: 'https://www.npmjs.com/~aoneahsan' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ahsan Mahmood. Built with Docusaurus. ClearHire is free to use.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'typescript', 'diff'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
