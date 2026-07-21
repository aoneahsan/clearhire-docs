---
id: intro
title: "ClearHire: Verified-Employment Resume Builder"
description: ClearHire is a resume builder and verified-employment job platform where past employers confirm your roles. Learn what it does, who it serves, and its limits.
slug: /intro
sidebar_label: Introduction
---

# ClearHire: Verified-Employment Resume Builder and Job Platform

ClearHire is a resume builder and job platform where the employment history on your CV can be confirmed by the people who actually employed you. Instead of trusting a resume on its own, ClearHire lets a job seeker request verification of a past role from that employer; once the employer confirms, a "Verified" badge backs that specific role. The same product also gives companies a place to post jobs, track applicants, and review people they have genuinely worked with.

ClearHire runs on the web at [clearhire.aoneahsan.com](https://clearhire.aoneahsan.com) and on Android via [Google Play](https://play.google.com/store/apps/details?id=com.aoneahsan.clearhire). It is built with React, Capacitor, and Firebase/Firestore, and most document generation and career tools run client-side in your browser.

## What makes ClearHire different

Most resume tools only format claims; they cannot tell whether those claims are true. ClearHire adds an [employment verification](/features/employment-verification) layer: a candidate asks a former employer to confirm a role, and the verified result is attached to that role. This does not vouch for your performance, salary, or character — it confirms that an employment relationship existed and was acknowledged by the other party. Reviews follow the same principle: [company reviews](/features/company-reviews) and employee reviews are tied to a verified employment link, so feedback comes from people who really worked together.

To be clear about the limits: verification depends on the employer responding, and an employer-side request can time out. A role without a verified badge is not "fake" — it simply has not been confirmed yet.

## Who ClearHire is for

ClearHire serves two audiences from one account model:

- **Job seekers** build a structured [profile](/features/profile-management), generate resumes with the [resume builder](/features/resume-builder), search and filter [jobs](/features/job-search), track every [application](/features/applications-tracking), and use [career tools](/features/career-tools) like the ATS checker and cover-letter generator.
- **Companies** create [company profiles](/features/for-companies), post jobs, manage an applicant pipeline, search for talent, initiate verification for their employees, and exchange reviews.

## Platforms and availability

| Platform | Status |
| --- | --- |
| Web (PWA) | Live at [clearhire.aoneahsan.com](https://clearhire.aoneahsan.com) |
| Android | Live on [Google Play](https://play.google.com/store/apps/details?id=com.aoneahsan.clearhire) |
| iOS | Not built — no release planned or dated |
| Browser extension | Built, but not published to any store (see [browser extension](/features/browser-extension)) |

The web app and the Android app share the same account and data, so you can start a resume on one and finish on the other.

## Pricing

Using ClearHire costs nothing. There are no subscriptions and no in-app purchases, for job seekers and companies alike.

The app does show promotions — first-party cards for the developer's other apps, which open automatically shortly after launch. There are no third-party ad networks.

Separately, ClearHire is offered as a **commercial white-label license** for organizations that want to run their own branded copy of the platform. That is a paid business arrangement priced in the thousands of dollars; it has no bearing on using the public app, which stays free. Details are on the app's own licensing pages.

If ClearHire saves you time and you want to support its development, there is an optional tip jar at [aoneahsan.com/payment](https://aoneahsan.com/payment?project-id=clearhire&project-identifier=com.aoneahsan.clearhire).

## Where to go next

- New here? Start with the [quick start](/getting-started/quick-start).
- Build the foundation: [create your profile](/getting-started/create-your-profile).
- Make a CV: [build your first resume](/getting-started/build-your-first-resume).
- The flagship feature: [employment verification](/features/employment-verification).
- Hiring? See [ClearHire for companies](/features/for-companies).
- Questions about data and privacy? Read the [privacy summary](/privacy) and the [FAQ](/faq).

## FAQ

### Does ClearHire cost anything to use?
No. There are no subscriptions or in-app purchases. The only promotions you see are first-party ads for the developer's other apps. (A separate paid white-label license exists for organizations wanting their own branded deployment — it does not affect the public app.) Supporting the project at [aoneahsan.com/payment](https://aoneahsan.com/payment?project-id=clearhire&project-identifier=com.aoneahsan.clearhire) is entirely optional.

### Do I need an account to use it?
Yes. Because ClearHire stores your profile, resumes, applications, and verification requests, you sign in so that data is saved to your account and available across devices. **Google is the only sign-in method** — there is no email-and-password option.

### Does the "Verified" badge prove I was a good employee?
No. Verification confirms that an employment relationship existed and was acknowledged by the employer. It does not rate your performance, confirm your title's seniority, or validate your salary.

### Is there an iOS app?
No. There is no iOS build, it is not in review, and no release date has been set. ClearHire ships on the web and on Android. iPhone and iPad users can use the web app in Safari.

### Who built ClearHire?
ClearHire is built and maintained by Ahsan Mahmood, a full-stack developer. See [about the author](/about-the-author).

> Built and maintained by [Ahsan Mahmood](https://aoneahsan.com) — [LinkedIn](https://linkedin.com/in/aoneahsan) · [GitHub](https://github.com/aoneahsan).
