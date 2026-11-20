---
id: index
title: "ClearHire for Developers: API, MCP, Webhooks and Feeds"
description: "Four ways to take your ClearHire job search somewhere else: a script, an AI assistant, your own server or a calendar app, and what none of them can ever do."
slug: /developers
sidebar_label: Overview
keywords: [clearhire api, clearhire mcp, clearhire webhooks, clearhire calendar feed, job search api]
last_update:
  date: 2026-11-20
  author: The ClearHire team
---

# ClearHire for developers

A job search makes a lot of small records: the application you sent on Monday, the second-round interview on
Thursday, the reminder to chase the recruiter if nobody writes back. ClearHire keeps them on one board. This
section is for when you want them somewhere else as well. A spreadsheet of every application and its stage.
Your interviews in the calendar on your phone. An assistant that can answer *"which applications have gone
quiet for two weeks?"* without you opening the tracker.

Every way in is opened by you, under **Settings → Other apps**, and closed from the same place.

## Which one do you need?

| You want to | Use | It can | Start here |
|---|---|---|---|
| Read or change your applications, interviews and reminders from your own code | An access key and the API | What the key's scopes allow | [Access keys](./authentication.md), then [the API](./api.md) |
| Ask Claude, ChatGPT, Claude Code or Cursor about your job search | The MCP server | What you approved on the consent page | [AI assistants](./mcp.md) |
| Have your server told the moment a stage changes | Webhooks | Receive events, nothing more | [Webhooks](./webhooks.md) |
| See interviews and reminders in Google Calendar, Apple Calendar or Outlook | A calendar feed | Read those two things, nothing else | [Calendar feed](./calendar-feed.md) |

## What can it reach?

**Your own account, in full:** applications, interviews, reminders, contacts, resumes, job alerts, your CV and
your profile.

**Your company, read only.** If you are an admin or a member of a company on ClearHire, a key or an assistant
may read that company's jobs and the applications sent to them. Nothing outside the app posts a job, moves an
applicant to another stage or changes the company. Those stay in ClearHire, where a person does them.

**Never** another person's account, and never a countersignature. Verification is answered by a named person
at the company, inside ClearHire, and no key can answer it for them.

## What holds whichever way you use?

- **Nothing is open on a new account.** No key, connection, webhook or feed exists until you make one.
- **Removing is never implied.** Write does not include remove. Remove is its own permission, unticked until
  you tick it, and an assistant cannot remove anything until you confirm it inside ClearHire.
- **You can see every way in.** Settings → Other apps lists each key, connected app, webhook and feed, with
  when it was last used.
- **Every request is answered as you,** by the same rules that decide what you see in the app.

[Two-step sign-in](./two-step-sign-in.md) guards all of it: with it on, showing a key again or approving a new
connection asks for a code. Changes to any of this are listed in the [developer changelog](./changelog.md).

> Built and maintained by [the ClearHire team](/about-the-author) — [aoneahsan.com](https://aoneahsan.com) · [GitHub](https://github.com/aoneahsan).
