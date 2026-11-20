/**
 * Every place ClearHire is released — the ONLY place a store or surface URL lives in this docs site
 * (standard aoneahsan-cccs-platform-links). Each surface passed its release proof on `verified`:
 * the web app answered 200, the Play listing is on the owner's developer page.
 */
export type PlatformId = 'web' | 'android' | 'docs';

export interface Platform {
  id: PlatformId;
  /** Store or surface name (a proper name, not copy). */
  name: string;
  href: string;
  /** What this surface is for, in ClearHire's words. */
  title: string;
  text: string;
  cta: string;
  primary?: boolean;
  verified: string;
}

export const PLATFORMS: readonly Platform[] = [
  {id: 'web', name: 'ClearHire web app', href: 'https://clearhire.aoneahsan.com', title: 'In your browser', text: 'Build the resume your employers can verify, search jobs, and run hiring for your company from one account.', cta: 'Open ClearHire', primary: true, verified: '2026-11-20'},
  {id: 'android', name: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.aoneahsan.clearhire', title: 'On your Android phone', text: 'Answer a verification request or check where an application stands, wherever you are.', cta: 'Get it on Google Play', verified: '2026-11-20'},
  {id: 'docs', name: 'Documentation', href: 'https://clearhire-docs.aoneahsan.com', title: 'These docs', text: 'Every feature, the plans, and how verification works, step by step.', cta: 'Read the docs', verified: '2026-11-20'},
];

export const APPS_PAGE = {
  title: 'Get ClearHire',
  description: 'Every place ClearHire is released: the web app, the Android app on Google Play, and these docs.',
  lead: 'One account on the web and on your phone, with these guides a tab away.',
} as const;

/** This site is the docs surface. */
export const CURRENT_SURFACE: PlatformId = 'docs';
export const OTHER_PLATFORMS: readonly Platform[] = PLATFORMS.filter((platform) => platform.id !== CURRENT_SURFACE);
export const PRIMARY_PLATFORM: Platform = PLATFORMS.find((platform) => platform.primary) ?? PLATFORMS[0];
export function platformHref(id: PlatformId): string {
  const found = PLATFORMS.find((platform) => platform.id === id);
  if (!found) throw new Error(`Unknown platform: ${id}`);
  return found.href;
}
/** `/apps` changes only when this list does: its sitemap date is the newest proof date. */
export const APPS_LASTMOD: string = PLATFORMS.map((platform) => platform.verified).sort().at(-1) ?? '2026-11-20';
