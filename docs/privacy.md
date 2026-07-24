---
id: privacy
title: "ClearHire Privacy Summary: What It Stores and Shares"
description: A plain-language summary of what ClearHire stores in Firestore, the providers it uses, how verification data is shared, and your export and deletion rights.
slug: /privacy
sidebar_label: Privacy
---

# ClearHire Privacy Summary

This ClearHire privacy summary is a plain-language overview of what the app stores, which services it relies on, and the rights you have over your data — written to help you understand the product, not to serve as the legal policy. The authoritative, binding privacy policy lives in the app itself at [clearhire.aoneahsan.com/privacy](https://clearhire.aoneahsan.com/privacy). If anything here differs from that policy, the in-app policy governs.

## What ClearHire stores

ClearHire stores the data needed to run the product in Firestore, including:

- Your [profile](/features/profile-management): experience, education, projects, skills, languages, certifications, awards
- Resumes you build and related settings
- [Applications](/features/applications-tracking) you track and their stages
- [Reviews](/features/company-reviews) tied to verified employment
- [Verification](/features/employment-verification) requests and confirmations

Files you upload (for projects or portfolio) are stored in **FilesHub** rather than Firestore.

ClearHire also keeps aggregate [profile-view counts](/features/analytics). For signed-out visitors, view counting uses a per-day identifier to avoid double-counting and does not build a personal profile of the viewer.

## Services ClearHire uses

To operate, ClearHire relies on a small set of providers:

| Provider | Purpose |
| --- | --- |
| Firebase Auth | Sign-in (Google only) |
| Firebase Analytics | Product analytics |
| Microsoft Clarity | Product/usage insight |
| Amplitude | Product analytics |
| Sentry | Error monitoring |
| FilesHub | Storage for uploaded files and transactional email delivery |

ClearHire sends a small number of transactional emails through FilesHub — welcome, contact-form reply, account-deletion confirmation, and identity-verification result. It sends no marketing email. See [notifications and emails](/features/notifications).

These help the app function, understand usage, and stay reliable. ClearHire does **not** use third-party advertising networks; the only promotions shown are first-party ads for the developer's other apps.

## How verification data is shared

[Employment verification](/features/employment-verification) involves two parties: you and the employer you ask. When you request verification, ClearHire shares only what is necessary for that employer to confirm the role. The confirmation result (the verified status of the role) is then reflected for you. Verification is about confirming a relationship, not exposing unrelated personal data.

## First-party promotions only

ClearHire shows promotions for the developer's other apps only — including a promo card that opens shortly after launch. There are no third-party ad networks, which means your data is not sold or shared to power external ad targeting.

Be aware that the analytics providers listed above still run regardless of the promotions: Microsoft Clarity in particular records usage sessions. There is no in-app toggle to switch product analytics off.

## Your rights: export and delete

You can take your data with you and remove it:

- **Export** your resumes as [PDF or DOCX](/guides/export-resume-pdf-docx) and keep copies of key details.
- **Delete** your account and data through the in-app account-deletion flow.

Step-by-step instructions are in [data export and deletion](/guides/data-export-and-deletion).

## Where the authoritative policy lives

This page is a docs summary for understanding the product. The full, authoritative privacy policy — including legal specifics on retention, processing, and your rights — is maintained in-app at [clearhire.aoneahsan.com/privacy](https://clearhire.aoneahsan.com/privacy). Always treat that policy as the source of truth.

## FAQ

### Is this page the official privacy policy?
No. This is a plain-language summary. The official, binding policy is in-app at [clearhire.aoneahsan.com/privacy](https://clearhire.aoneahsan.com/privacy).

### Does ClearHire sell my data or use ad networks?
No. ClearHire uses no third-party ad networks and shows only first-party promotions for the developer's own apps.

### Where are my uploaded files stored?
Uploaded files are stored in FilesHub. Other data (profile, resumes, applications, reviews) is stored in Firestore.

### What is shared during verification?
Only what is necessary for the employer to confirm the role. See [employment verification](/features/employment-verification).

### How do I remove my data?
Use the in-app account-deletion flow. Export first if you want copies — see [data export and deletion](/guides/data-export-and-deletion).

> Built and maintained by [Ahsan Mahmood](https://aoneahsan.com) — [LinkedIn](https://linkedin.com/in/aoneahsan) · [GitHub](https://github.com/aoneahsan).
