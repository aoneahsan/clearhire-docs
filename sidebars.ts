import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Sidebar layout for ClearHire docs.
 *
 * Baseline set documents every shipped feature area of the app. Long-tail
 * deep-enrichment pages (tracked in docs/tracking/clearhire-docs-content-tracker.json)
 * are appended here as they land.
 */
const sidebars: SidebarsConfig = {
  mainSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/quick-start',
        'getting-started/create-your-profile',
        'getting-started/build-your-first-resume',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      collapsed: false,
      items: [
        'features/profile-management',
        'features/resume-builder',
        'features/employment-verification',
        'features/job-search',
        'features/applications-tracking',
        'features/company-reviews',
        'features/career-tools',
        'features/gamification',
        'features/analytics',
        'features/for-companies',
        'features/browser-extension',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: true,
      items: [
        'guides/export-resume-pdf-docx',
        'guides/request-employment-verification',
        'guides/ats-resume-checker',
        'guides/data-export-and-deletion',
      ],
    },
    'faq',
    'privacy',
    'changelog',
    'about-the-author',
  ],
};

export default sidebars;
