---
id: calendar-feed
title: "ClearHire Calendar Feed: Interviews in Your Calendar"
description: "Subscribe to your ClearHire interviews and reminders from Google Calendar, Apple Calendar or Outlook with a private, read-only feed address you can revoke."
slug: /developers/calendar-feed
sidebar_label: Calendar feed
keywords: [clearhire calendar feed, interview calendar subscription, ics feed, google calendar subscription]
last_update:
  date: 2026-11-19
  author: The ClearHire team
---

:::warning[Not switched on yet (19 November 2026)]
This arrives with the next ClearHire release. Until then, nothing on this page works.
:::

# Calendar feed

The calendar feed puts your ClearHire interviews and reminders in the calendar you already live in, beside
work, the dentist and everything else. You make a feed under **Settings → Other apps**, copy its address, and
subscribe to it from Google Calendar, Apple Calendar, Outlook or any app that takes an `.ics` subscription. It
is read only: your calendar app shows what ClearHire holds and cannot change it.

## How do you subscribe?

1. In ClearHire, open **Settings → Other apps** and make a calendar feed.
2. Copy the address it gives you.
3. In your calendar app, add a calendar from a URL. Google Calendar calls it *From URL*; Apple Calendar calls it
   *New Calendar Subscription*. Paste the address.

Your calendar app decides how often it checks, not ClearHire. Some look every few minutes and Google Calendar
can take hours, so an interview you move in ClearHire may take a while to move there.

## What is in it?

Two things: your **interviews** and your **reminders**. Every reminder appears at its own time, whether it
belongs to an interview or stands alone, like *chase them on Thursday*. Your applications, contacts, resumes and messages
are not in the feed, and nothing on the company side is.

Each response carries an `ETag`. A calendar app that sends it back with `If-None-Match` gets `304 Not Modified`
when nothing has changed, so frequent checks stay cheap for both sides.

## Is the address a secret?

Yes. A calendar app cannot send an access key, so the feed's credential is part of its address, and anyone who
has the address can read your interviews. That is why a feed gives away as little as it can:

- it reaches interviews and reminders, read only, and nothing else;
- it is not an access key and does not work on the [API](./api.md);
- you can see it again only under the same [10-minute rule](./authentication.md#can-you-see-a-key-again) as a key.

## How do you stop a feed?

Revoke it on its row. From then on the address answers `404`, and your calendar app drops the events the next
time it checks. If an address has ended up somewhere it should not, revoke it and make a new one. One feed per
calendar app means revoking one leaves the others working.

> Built and maintained by [the ClearHire team](/about-the-author) — [aoneahsan.com](https://aoneahsan.com) · [GitHub](https://github.com/aoneahsan).
