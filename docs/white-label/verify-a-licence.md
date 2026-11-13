---
id: verify-a-licence
title: "Verify a ClearHire White-Label Licence by Key or by Domain"
description: "Check whether a copy of ClearHire is licensed: paste its key or domain on the verify page and read our licensing service's answer, not the site's claim."
slug: /white-label/verify-a-licence
sidebar_label: Verify a licence
last_update:
  date: 2026-11-13
  author: ClearHire team
---

# Verify a licence

**Verifying a licence means asking our licensing service, not the site being checked, whether a copy of ClearHire
is covered.** A deployment saying it is licensed is a claim. The [verify page](https://clearhire.aoneahsan.com/verify-license)
shows the answer.

## Check by licence key

Paste the key, which starts with `CLEARHIRE-WL-`. The answer is one of:

| Answer | What it means |
| --- | --- |
| Valid | The key is active and covers the domains listed under it |
| Pending setup | The licence was bought and the copy is not deployed yet |
| Revoked | The licence was withdrawn; a copy running on it is not licensed |
| Not found | No licence has this key |
| Not a licence key | The text is not the shape of a ClearHire key |

## Check by domain

Paste the domain a copy runs on, such as `careers.example.org`. The service reads that site's public licence file at
`/.well-known/clearhire-white-label-license.json` over HTTPS, then checks the key inside it. It answers *licensed*,
*wrong domain*, *revoked*, *not a valid licence*, *no licence file* or *could not reach the site*.

## What the answer shows

Only what is safe to show a stranger: the licence holder, the domains, the platforms, the issue date, the date
updates run until and the status. Never an email address, a phone number or a price. An active licence also links
its public certificate as a PDF.

## Frequently asked questions

### Can someone fake the licence file?
They can publish a file, but the key inside it is checked against our records, and a key only covers the domains it
was issued for. A copied file on another domain reads *wrong domain*.

### Does a licensed copy check itself?
Yes. Each licensed copy asks the licensing service once when it starts. If the licence is revoked or does not cover
the address, the copy stops at a notice and deletes nothing. If the service cannot be reached, the copy keeps
working and asks again on its next start.

> Built and maintained by [the ClearHire team](/about-the-author) — [aoneahsan.com](https://aoneahsan.com) · [GitHub](https://github.com/aoneahsan).
