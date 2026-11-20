---
id: mcp
title: "How to Connect an AI Assistant to ClearHire Through MCP"
description: "Connect Claude, ChatGPT, Claude Code or Cursor to your ClearHire account through MCP, choose what it may do on the consent page, and confirm every removal."
slug: /developers/mcp
sidebar_label: AI assistants (MCP)
keywords: [clearhire mcp server, connect claude to clearhire, chatgpt connector, claude code mcp, cursor mcp]
last_update:
  date: 2026-11-20
  author: The ClearHire team
---

# Connect an AI assistant (MCP)

The ClearHire MCP server lets an AI assistant work on your job search when you ask it to: *"which applications
have had no reply for two weeks?"*, *"move the Northwind application to second interview"*, *"remind me to chase
them on Thursday"*. You give the assistant one address, sign in to ClearHire, and choose on the consent page what
it may do. It works with Claude, ChatGPT, Claude Code, Cursor and any other assistant that speaks MCP.

## What is the address?

```text
https://lxvdadoeyghxqyanpyla.supabase.co/functions/v1/mcp
```

The same address is under **Settings → Other apps**, with a copy button. You never paste a key into an
assistant: it finds ClearHire's sign-in from this address and sends you there.

## How do you connect each assistant?

These apps move their menus between releases. If a step does not match what you see, look for **Connectors**
in the app's settings.

### Claude

1. Open **Settings → Connectors** and add a custom connector.
2. Paste the address above.
3. Sign in to ClearHire when asked, and approve on the consent page.

### ChatGPT

1. Open **Settings → Connectors**. Some accounts need developer mode switched on first.
2. Add a connector with the address above.
3. Sign in to ClearHire when asked, and approve on the consent page.

### Claude Code

```bash
claude mcp add --transport http clearhire https://lxvdadoeyghxqyanpyla.supabase.co/functions/v1/mcp
```

Then run `/mcp` inside Claude Code, choose **clearhire**, and sign in in the browser it opens.

### Cursor

Add ClearHire to your `mcp.json`:

```json
{
  "mcpServers": {
    "clearhire": {
      "url": "https://lxvdadoeyghxqyanpyla.supabase.co/functions/v1/mcp"
    }
  }
}
```

Cursor asks you to sign in the first time it uses it.

## What does the consent page ask?

Before any assistant reaches your account, ClearHire shows you:

- **which app is asking**, and where it will send you back;
- **which ClearHire account** it is about to reach, worth a look if you keep a personal and a work account;
- **what it may do**, in sentences grouped into read, write and remove, each with its own tick box. Remove
  starts unticked. If you belong to a company, reading its jobs and their applications is offered as well,
  and only ever as reading;
- **Approve** and **Deny**, side by side.

With [two-step sign-in](./two-step-sign-in.md) on, approving asks for a code. The assistant sees only the tools
your choices allow: approve reading alone and it has no way to change anything.

## How are removals handled?

An assistant can **ask** to remove something; only you can **carry it out**. When you tell it to delete an
application or a reminder, it shows what would go and gives you a link into ClearHire. You confirm there, or
nothing is removed. A line hidden in a job advert or a pasted email cannot talk the assistant into clearing
your tracker, because the assistant cannot confirm its own request.

Without a remove permission ticked on the consent page, the assistant cannot even ask.

## How do you disconnect it?

Open **Settings → Other apps** and revoke it on its row. Its access ends on its next request. The list shows
each connected app's permissions, when it connected and when it was last used.

## Why is it not working?

| What you see | What to do |
|---|---|
| The assistant asks you to sign in again | Its sign-in ran out. Sign in to ClearHire again from the assistant |
| It says it lacks a permission | It was not granted that one. Disconnect, reconnect, and tick it on the consent page |
| It cannot move an applicant or post a job | Nothing outside ClearHire can. Do it in the app |
| ClearHire is gone from its tools, or every call fails | It was revoked. Check Settings → Other apps, then reconnect |
| A removal did nothing | It was not confirmed inside ClearHire. Ask again and confirm |

> Built and maintained by [the ClearHire team](/about-the-author) — [aoneahsan.com](https://aoneahsan.com) · [GitHub](https://github.com/aoneahsan).
