---
id: api
title: "The ClearHire API: Base Address, OpenAPI and Pagination"
description: "The ClearHire REST API at one versioned base address, with cursor pagination at 20 rows a page by default and 50 at most, and an OpenAPI file of every route."
slug: /developers/api
sidebar_label: The API
keywords: [clearhire api, clearhire rest api, openapi, api pagination, next_cursor]
last_update:
  date: 2026-11-20
  author: The ClearHire team
---

# The ClearHire API

The ClearHire API is a REST API at one base address. Every route, field and error it has is written down in an
OpenAPI file, and that file, not this page, is the reference. This page says where it is, how to read it, and
the rule every list follows.

## What is the base address?

```text
https://lxvdadoeyghxqyanpyla.supabase.co/functions/v1/api/v1
```

The `v1` at the end is the API's version. Every request needs an access key or an app connection, see
[Access keys](./authentication.md).

```bash
curl -H "Authorization: Bearer $CLEARHIRE_KEY" \
  https://lxvdadoeyghxqyanpyla.supabase.co/functions/v1/api/v1/openapi.json
```

## Where is the full reference?

| File | Address | Read it with |
|---|---|---|
| OpenAPI 3.1, JSON | [`/v1/openapi.json`](https://lxvdadoeyghxqyanpyla.supabase.co/functions/v1/api/v1/openapi.json) | Swagger UI, Redocly, Postman, Insomnia, or a client generator |
| The same, as Markdown | [`/v1/openapi.md`](https://lxvdadoeyghxqyanpyla.supabase.co/functions/v1/api/v1/openapi.md) | A browser, a text editor, or an AI assistant you paste it into |

Both are built from the same source as the API, so neither can list a route that does not exist or miss one
that does.

## How do you read the OpenAPI file?

- **`paths`**: every route, its method, and the scope it needs.
- **`components.schemas`**: every field a response can carry, with its type. A field that is not listed is
  never sent.
- **`components.securitySchemes`**: the two ways in, a bearer access key and OAuth.
- **The error responses**: every `code` the [error envelope](./authentication.md#what-does-an-error-look-like) can carry, route by
  route.

What the API reaches is exactly what the file lists: your own applications, interviews, reminders, contacts,
resumes, job alerts, CV and profile, and, for a company you belong to, its jobs and their applications, read
only. Anything absent from the file is out of reach on purpose.

## How does pagination work?

Every list comes in pages:

- **20 rows a page** by default, **50 at most**.
- A page with more after it carries a `next_cursor`. Send that value back to get the next page.
- A page without one is the last.

A cursor is a bookmark, not a page number, so an application you log while a script is reading does not shift
every row by one. The parameter names are in the OpenAPI file, on each list route.

## What about rate limits and errors?

The same on every route. Both are on [Access keys](./authentication.md#what-are-the-rate-limits).

> Built and maintained by [the ClearHire team](/about-the-author) — [aoneahsan.com](https://aoneahsan.com) · [GitHub](https://github.com/aoneahsan).
