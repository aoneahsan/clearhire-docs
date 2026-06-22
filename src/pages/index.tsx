import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

const APP_URL = 'https://clearhire.aoneahsan.com';
const PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.aoneahsan.clearhire';

type Feature = {
  title: string;
  body: string;
};

const FEATURES: Feature[] = [
  {
    title: 'Verified employment history',
    body: 'Request verification from a past employer; once they confirm, a "Verified" badge sits on that role. Companies can trust what they read instead of taking a resume at face value.',
  },
  {
    title: 'One profile, many resumes',
    body: 'Fill out a structured profile once — experience, education, projects, skills, languages, certifications, awards — then generate professional CVs from it and export to PDF or DOCX.',
  },
  {
    title: 'Job search and alerts',
    body: 'Search roles with filters for location, remote, salary, and skills. Save searches and turn on alerts so new matches reach you without re-running the same query.',
  },
  {
    title: 'Application tracking',
    body: 'Track every job you apply to through stages from applied to offer. Companies get a pipeline view of applicants; you get a clear board of where each application stands.',
  },
  {
    title: 'Mutual reviews',
    body: 'Candidates review companies and companies review employees, tied to a verified employment link — so reviews come from people who actually worked together.',
  },
  {
    title: 'Career tools',
    body: 'An ATS resume checker, cover-letter and bio generators, interview prep, salary insights, and gamified streaks and badges that keep your job hunt moving.',
  },
];

function HomepageHeader(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
        <p className={styles.heroTagline}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/intro">
            Read the docs
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/getting-started/quick-start"
          >
            Quick Start
          </Link>
          <Link className="button button--outline button--lg" href={APP_URL}>
            Open the app
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.featuresWrap}>
      <div className="container">
        <div className="row">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="col col--4"
              style={{ marginBottom: '1.5rem' }}
            >
              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureBody}>{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AuthorStrip(): ReactNode {
  return (
    <section className={styles.authorStrip}>
      <div className="container">
        <p>
          ClearHire is free to use. Get it on{' '}
          <Link href={PLAY_URL}>Google Play</Link> or open it on the{' '}
          <Link href={APP_URL}>web</Link>. Built and maintained by{' '}
          <Link href="https://aoneahsan.com">Ahsan Mahmood</Link> —{' '}
          <Link href="https://linkedin.com/in/aoneahsan">LinkedIn</Link> ·{' '}
          <Link href="https://github.com/aoneahsan">GitHub</Link>
        </p>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} — Verified resumes & employment`}
      description="Documentation for ClearHire: build verified resumes, prove your employment history, search jobs, track applications, and exchange mutual reviews. Free on web and Android."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <AuthorStrip />
      </main>
    </Layout>
  );
}
