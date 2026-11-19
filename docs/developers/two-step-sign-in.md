---
id: two-step-sign-in
title: "Two-Step Sign-In for Your ClearHire Account Explained"
description: "Turn on two-step sign-in for ClearHire with an authenticator app, keep recovery codes for a lost phone, choose whether to remember a browser; admins must use it."
slug: /developers/two-step-sign-in
sidebar_label: Two-step sign-in
keywords: [clearhire two-step sign-in, two-factor authentication, authenticator app, recovery codes]
last_update:
  date: 2026-11-19
  author: The ClearHire team
---

:::warning[Not switched on yet (19 November 2026)]
This arrives with the next ClearHire release. Until then, nothing on this page works.
:::

# Two-step sign-in

Two-step sign-in asks for a six-digit code from an authenticator app after you sign in with Google. Your
ClearHire account holds the roles a company countersigned and every application you have in flight; with
two-step on, someone who gets into your Google account still cannot get into ClearHire without your phone.
It is your choice for your own account. Admins do not get the choice: it is required on every admin account.

## How do you turn it on?

1. Open **Settings → Security**.
2. Scan the QR code with an authenticator app: Google Authenticator, Microsoft Authenticator, 1Password,
   Bitwarden or any other that makes six-digit codes. If you cannot scan, type in the key shown under it.
3. Enter the code the app shows. Once ClearHire accepts it, two-step sign-in is on.

## What are recovery codes for?

Turning it on shows a set of **recovery codes**, once. They are your spare key for the day your phone is lost,
wiped or replaced. Download them, or copy them somewhere that is not your phone.

- Each code signs you in once, in place of a code from your app.
- Two-step sign-in stays on after you use one. The next sign-in asks for a code again.
- Making a new set replaces the old one, and the old codes stop working. It asks for a current code first.

## What does "Remember this browser" do?

After you enter a code, the sign-in screen offers to **remember this browser for 7 days**. It starts unticked,
and stays that way unless you tick it.

| You leave it | Next time you sign in |
|---|---|
| Unticked | ClearHire asks for a code again |
| Ticked | This browser on this device skips the code for 7 days. Any other browser or device still asks |

Signing out ends it for that browser, and turning two-step sign-in off forgets every remembered browser.
**Settings → Security** lists each one with when it was remembered and when that runs out, and lets you forget
one or all of them.

A remembered browser still asks for a code to show an access key or a webhook secret, to change two-step
sign-in itself, and to open the admin panel.

## Where else does it ask for a code?

- **Showing a key, a webhook secret or a feed address again.** See [Access keys](./authentication.md#can-you-see-a-key-again).
- **Approving a new app or AI assistant** on the consent page. See [AI assistants](./mcp.md#what-does-the-consent-page-ask).
- **Turning two-step sign-in off.** Removing it takes a current code.

## Lost your phone and your codes?

Write to the ClearHire team at [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com) from the address your account
signs in with. Before two-step sign-in is switched off on any account, the team checks that the account really
is yours. That takes longer than a recovery code, on purpose: it is the same check a stranger would have to
get past.

## Do admins have to use it?

Yes. Nobody opens ClearHire's admin panel without a code entered in that session, and a remembered browser
does not count there.

> Built and maintained by [the ClearHire team](/about-the-author) — [aoneahsan.com](https://aoneahsan.com) · [GitHub](https://github.com/aoneahsan).
