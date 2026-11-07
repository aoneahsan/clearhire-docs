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
        'features/notifications',
        'features/page-tours-and-walkthrough',
        'features/phone-app-view',
        'features/paid-plans',
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
    {
      type: 'category',
      label: 'Moving to ClearHire',
      collapsed: true,
      link: { type: 'doc', id: 'compare/index' },
      items: [
        {
          type: 'category',
          label: 'CV and resume builders',
          collapsed: true,
          items: [
            'compare/visualcv',
            'compare/resume-io',
            'compare/novoresume',
            'compare/zety',
            'compare/kickresume',
            'compare/enhancv',
            'compare/flowcv',
            'compare/resume-genius',
            'compare/rezi',
            'compare/teal',
            'compare/reactive-resume',
            'compare/livecareer',
            'compare/myperfectresume',
            'compare/canva',
          ],
        },
        {
          type: 'category',
          label: 'Job boards',
          collapsed: true,
          items: [
            'compare/indeed',
            'compare/linkedin-jobs',
            'compare/wellfound',
            'compare/monster',
            'compare/dice',
            'compare/flexjobs',
            'compare/himalayas',
            'compare/remote-ok',
            'compare/we-work-remotely',
            'compare/seek',
            'compare/glassdoor-jobs',
            'compare/ziprecruiter',
            'compare/jobicy',
          ],
        },
        {
          type: 'category',
          label: 'Verified work history and employer reviews',
          collapsed: true,
          items: [
            'compare/linkedin-verifications',
            'compare/seek-pass',
            'compare/truework',
            'compare/checkr',
            'compare/veremark',
            'compare/xref',
            'compare/certn',
            'compare/indeed-company-reviews',
            'compare/comparably',
            'compare/glassdoor-reviews',
            'compare/workamper',
            'compare/blind',
          ],
        },
      ],
    },
    'faq',
    'privacy',
    'changelog',
    'about-the-author',
  ],
};

export default sidebars;
