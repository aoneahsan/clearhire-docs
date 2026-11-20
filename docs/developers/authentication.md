---
id: authentication
title: "ClearHire Access Keys: Scopes, OAuth and Rate Limits"
description: "How your code proves it may reach your ClearHire account: access keys and scopes, the 10-minute rule for seeing a key again, expiry, OAuth, limits and errors."
slug: /developers/authentication
sidebar_label: Access keys
keywords: [clearhire access key, clearhire api authentication, clearhire oauth, api scopes, api rate limits]
last_update:
  date: 2026-11-20
  author: The ClearHire team
---

# Access keys and sign-in for apps

An access key is a long secret your code sends with every request, as `Authorization: Bearer <key>`. You make
it under **Settings → Other apps**, choose what it may touch and when it runs out, and revoke it whenever you
like. An app that connects on your behalf uses OAuth instead, so you never hand it a key at all.

## How do you make a key?

1. Open **Settings → Other apps** and start a new access key.
2. Name it so you will know it in three months. *Applications spreadsheet* says more than *key 1*.
3. Choose its scopes and how long it lasts.
4. The key shows once, with a copy button. Put it somewhere safe before you close the panel.

The list then shows each key's name, scopes, first few characters, when it was made and when it was last
used, never the whole key. ClearHire emails you each time a key is made, so one you did not make does not slip
past.

## Can you see a key again?

Yes, within **10 minutes of a fresh sign-in**. The same rule covers a webhook signing secret and a calendar
feed address.

| When | What happens |
|---|---|
| You signed in under 10 minutes ago | The key shows |
| You signed in longer ago | ClearHire says so and offers to sign you in again, then brings you back to the same row |
| Two-step sign-in is on | You also enter a code from your authenticator app, even inside the 10 minutes |

Staying signed in for weeks is convenient, and it is also exactly what a laptop left open in a shared office
looks like. A fresh sign-in is the proof that the person asking is you. A key is never sent by email.

## What do the scopes mean?

Each part of your account has up to three scopes:

| Scope | Lets the key |
|---|---|
| `<part>:read` | Read it: your applications, interviews, reminders, contacts, resumes, job alerts, CV or profile |
| `<part>:write` | Add to it and change it |
| `<part>:delete` | Remove from it |

If you belong to a company on ClearHire, two more are offered, and both only read:

| Scope | Lets the key |
|---|---|
| `company_jobs:read` | Read the jobs your company has posted |
| `company_applications:read` | Read the applications sent to those jobs |

There is no scope that posts a job, moves an applicant or edits a company. The exact name of every scope is in
the [OpenAPI file](./api.md#where-is-the-full-reference).

**Write includes read. Remove is never included.** A write scope lets the key read what it changes; nothing
lets it remove unless you ticked that scope, which sits apart on the screen and starts unticked. A key's
scopes never grow after it is made: when you need more, make a new key and revoke the old one.

## How long does a key last?

You choose **30, 90 or 365 days**. After that date every request made with it answers `401`.

## How do you replace or revoke a key?

- **Replace** makes a new key. The old one keeps working for 24 hours while you swap the new one into your
  code, and is then revoked. Both sit in the list until then.
- **Revoke** stops a key at once. The next request made with it answers `401`.

Deleting your ClearHire account revokes every key, connected app, webhook and feed with it.

## How does an app connect without a key?

Through OAuth 2.1, the same sign-in an AI assistant uses. The app sends you to ClearHire's consent page, which
shows the app's name and where it will send you back, the ClearHire account being connected, and what the app
is asking for, in plain sentences grouped into read, write and remove, remove unticked to start. **Approve**
and **Deny** sit side by side. With two-step sign-in on, approving asks for a code.

The app then appears under Settings → Other apps, where you can revoke it. Revoking ends its access on its next
request, not whenever its sign-in would have run out. More on the consent page:
[AI assistants](./mcp.md#what-does-the-consent-page-ask).

## What are the rate limits?

Each key and each connected app may send **120 requests a minute**. On top of that your account has a daily
total, set by your plan and shared by every key and app you have, so making more keys never raises it.
Settings → Other apps shows both limits beside today's count; the plans themselves are on the
[pricing page](https://clearhire.aoneahsan.com/pricing).

| Header | Means |
|---|---|
| `RateLimit-Limit` | Requests allowed in the current window |
| `RateLimit-Remaining` | Requests left in it |
| `RateLimit-Reset` | Seconds until the window starts again |

Past a limit the API answers `429` with a `Retry-After` header. Wait that many seconds, then try again.

## What does an error look like?

Every error, from every route, has the same shape:

```json
{
  "error": {
    "code": "reauth_required",
    "message": "Sign in again to see this key.",
    "details": { "max_age_seconds": 600 },
    "correlation_id": "…"
  }
}
```

Program against `code`; `message` is for people and may be reworded. If you write to us about a failed request,
quote the `correlation_id`. It is how we find that one request and nothing else.

| Status | Usually means |
|---|---|
| `401` | No key, a wrong one, or one that is revoked or expired |
| `403` | The key lacks a scope the request needs (`details` names it), or a fresh sign-in is needed |
| `404` | Nothing with that id on your account, including anything that belongs to someone else |
| `429` | A rate limit was reached; see `Retry-After` |

Every code is listed in the [OpenAPI file](./api.md#where-is-the-full-reference).

> Built and maintained by [the ClearHire team](/about-the-author) — [aoneahsan.com](https://aoneahsan.com) · [GitHub](https://github.com/aoneahsan).
