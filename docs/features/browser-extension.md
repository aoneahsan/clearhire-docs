---
id: browser-extension
title: "ClearHire Browser Extension: Capture and Auto-Fill"
description: The ClearHire browser extension captures LinkedIn profiles and auto-fills job applications on LinkedIn, Indeed, and Glassdoor. It is built but not yet published.
slug: /features/browser-extension
sidebar_label: Browser Extension
---

# ClearHire Browser Extension

The ClearHire browser extension is a desktop Chrome add-on that captures a LinkedIn profile, auto-fills job-application forms, and keeps a local list of jobs you have viewed — on three sites only: **LinkedIn, Indeed, and Glassdoor**. Its purpose is narrow on purpose: stop you retyping the same details into every application form.

:::warning Status: built, not yet published
The extension is built (version 1.1.1) but **is not published on any browser store yet**. The first Chrome Web Store submission is still pending review, so there is no install link to give you. Everything below describes the built behavior, not something you can install today. Until it ships, manage applications directly in the [web app](https://clearhire.aoneahsan.com) or the [Android app](https://play.google.com/store/apps/details?id=com.aoneahsan.clearhire).
:::

## Supported sites

The extension runs on three sites and nowhere else. It has no permission to read any other page.

| Site | Where it runs | What it does there |
| --- | --- | --- |
| LinkedIn | Profile pages (`/in/*`) and job pages (`/jobs/*`) only | Capture profile details; auto-fill applications; track a job |
| Indeed | Site-wide | Auto-fill applications; track a job |
| Glassdoor | Site-wide | Auto-fill applications; track a job |

On LinkedIn it is deliberately path-restricted, so it does not run on your feed, messaging, or notifications.

## What it does

- **Capture a LinkedIn profile.** From a profile page, capture name, headline, current company, location, and summary, plus skills, experience, education, and certifications. The capture is saved on your device for reference.
- **Auto-fill an application form.** On a detected application form on LinkedIn Jobs, Indeed, or Glassdoor, fill in the details you have stored.
- **Track a job you viewed.** Save a job to a local list so you can return to it. The list keeps up to 100 entries.
- **Work by keyboard.** `Alt+Shift+E` to capture, `Alt+Shift+F` to auto-fill, `Alt+Shift+T` to track a job, `Alt+Shift+O` to open the popup.

## Where the data lives

Extension data — your stored application details, captured profiles, tracked jobs, and settings — is kept **locally in your browser** using `chrome.storage`. It is not a second view of your ClearHire account.

Two consequences worth being clear about:

- **Jobs tracked in the extension do not appear in the app's [application tracking](/features/applications-tracking).** The two lists are separate. To track an application in your ClearHire account, log it in the app.
- **Nothing syncs across devices.** Install it on a second computer and it starts empty.

Optional Google sign-in (via the Chrome Identity API) exists only to show your name, email, and picture inside the extension. It is not required to use any feature.

## Privacy

- **Analytics and error reporting are off by default.** They are genuinely opt-in: you turn them on in the options page and can turn them off again at any time.
- **No remote scripts are loaded**, and no third-party auth SDK is bundled.
- **Data is not sold or shared.**

## Browser availability

Chrome is the only build target today, and the Chrome Web Store is the first and only submission prepared. Brave installs from the same Chrome listing.

| Browser | Status |
| --- | --- |
| Chrome | Built; first Chrome Web Store submission pending |
| Brave | Would install from the Chrome listing once it is published |
| Edge | Not submitted; listing not yet written |
| Firefox | Not submitted; listing not yet written |

Edge and Firefox are possible later but are not committed to a date. Treat them as unavailable.

## What the extension does not do

- **It is not installable today.** There is no store listing yet, in any browser.
- **It does not work on other job sites.** LinkedIn, Indeed, and Glassdoor only — it does not support Workable, Greenhouse, Lever, or company career pages.
- **It does not sync with your ClearHire account.** Its data stays in your browser.
- **It does not apply for you.** It fills forms you opened; you review and submit.

When it is published, this page and the [changelog](/changelog) will be updated with the real install link.

## FAQ

### Can I install the extension now?
No. It is built but has not been published to any browser store. Use the [web app](https://clearhire.aoneahsan.com) or the [Android app](https://play.google.com/store/apps/details?id=com.aoneahsan.clearhire) in the meantime.

### Which sites does it support?
LinkedIn, Indeed, and Glassdoor. No others.

### Will jobs I track in the extension show up in my ClearHire tracker?
No. Extension data is stored locally in your browser and is separate from your account. Log applications in the app to see them in [application tracking](/features/applications-tracking).

### Which browsers will it support?
Chrome is the build target and the first submission. Brave uses the same listing. Edge and Firefox are not submitted and have no date.

### Does it collect analytics?
Only if you switch it on. Analytics and error reporting ship off by default.

### How will I know when it launches?
Watch the [changelog](/changelog). Both pages will be updated with the store link once it is published.

> Built and maintained by [Ahsan Mahmood](https://aoneahsan.com) — [LinkedIn](https://linkedin.com/in/aoneahsan) · [GitHub](https://github.com/aoneahsan).
