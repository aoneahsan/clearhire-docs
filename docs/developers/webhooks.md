---
id: webhooks
title: "ClearHire Webhooks: Events, Signatures and Retries"
description: "ClearHire webhooks tell your server when an application, interview, reminder or job alert changes. Standard Webhooks signing, with Node, Python and PHP code."
slug: /developers/webhooks
sidebar_label: Webhooks
keywords: [clearhire webhooks, standard webhooks, webhook signature verification, webhook retries]
last_update:
  date: 2026-11-20
  author: The ClearHire team
---

# Webhooks

A webhook is a signed `POST` from ClearHire to an address you own, sent the moment something changes on your
account. You move an application to *Offer*, and your spreadsheet hears about it before you have closed the
tab. Add the address under **Settings → Other apps**, choose its events, and check the signature on every
request so you know it really came from ClearHire.

## Which events are there?

Webhooks cover your own account. Nothing on the company side sends one.

| Event | Sent when |
|---|---|
| `application.created` · `application.updated` · `application.deleted` | You log, edit or remove an application |
| `application.stage_changed` | An application moves to another stage |
| `interview.created` · `interview.updated` · `interview.deleted` | You add, change or remove an interview |
| `interview.outcome_recorded` | You record what came of an interview |
| `reminder.created` · `reminder.updated` · `reminder.deleted` | You add, change or remove a reminder |
| `job_alert.created` · `job_alert.updated` · `job_alert.deleted` | You add, change or remove a job alert |
| `webhook.test` | You send a test event |

Every event's payload is in the [OpenAPI file](./api.md#where-is-the-full-reference). This page does not copy it, so it cannot
fall behind.

## Which addresses are accepted?

- `https://` only, on port 443 or 8443, with no user name or password in the address.
- Never a private or local address: `localhost`, `127.0.0.1`, `10.x.x.x`, `192.168.x.x`, link-local addresses,
  or a name that points at any of them. The check runs when you save the address and again before every send,
  and a redirect to a private address is refused too.
- Your server has 10 seconds to answer.

## What does a request carry?

ClearHire follows the [Standard Webhooks](https://www.standardwebhooks.com/) specification. Each request has
three headers:

| Header | Holds |
|---|---|
| `webhook-id` | The event's id. It stays the same on every retry, so use it to ignore a repeat |
| `webhook-timestamp` | When it was sent, in seconds since 1970 |
| `webhook-signature` | `v1,` and a base64 HMAC-SHA256 signature; there may be more than one, separated by spaces |

The signing secret starts `whsec_`. You can see it again under the same
[10-minute rule](./authentication.md#can-you-see-a-key-again) as an access key. Rotating issues a new secret and signs with both
for 24 hours, so a receiver that accepts either keeps working while you swap it in.

## How do you check a request?

Check before you parse, against the exact bytes you received. A body that has been parsed and written back out
as JSON will not match its signature. The libraries below are the Standard Webhooks ones: `standardwebhooks`
on npm and PyPI, and `standard-webhooks/standard-webhooks` on Packagist.

### Node

```js
import { Webhook } from 'standardwebhooks';

const wh = new Webhook(process.env.CLEARHIRE_WEBHOOK_SECRET); // the whsec_… value

app.post('/hooks/clearhire', express.raw({ type: 'application/json' }), (req, res) => {
  let event;
  try {
    event = wh.verify(req.body, req.headers); // throws on a bad signature or an old timestamp
  } catch {
    return res.sendStatus(400);
  }
  if (alreadyHandled(req.headers['webhook-id'])) return res.sendStatus(200);
  queue.add(event); // answer fast, do the work later
  res.sendStatus(200);
});
```

### Python

```python
import os
from standardwebhooks.webhooks import Webhook

wh = Webhook(os.environ["CLEARHIRE_WEBHOOK_SECRET"])
payload = wh.verify(request.get_data(), dict(request.headers))
```

### PHP

```php
$wh = new \StandardWebhooks\Webhook(getenv('CLEARHIRE_WEBHOOK_SECRET'));
$payload = $wh->verify(file_get_contents('php://input'), getallheaders());
```

### Any other language

1. `secret = base64decode(the whsec value without its "whsec_" prefix)`.
2. `signed = webhook-id + "." + webhook-timestamp + "." + raw body`.
3. `expected = base64(HMAC_SHA256(secret, signed))`.
4. Compare `expected` with each `v1,` value in `webhook-signature`, in constant time. Any match passes.
5. Refuse the request when `|now − webhook-timestamp| > 300`.

## What if your server does not answer?

Any `2xx` counts as delivered. Anything else, a different status, a timeout or a refused connection, is a
failed attempt, and ClearHire tries again on this schedule:

| Attempt | Sent |
|---|---|
| 1 | At once |
| 2 | 5 seconds later |
| 3 | 5 minutes later |
| 4 | 30 minutes later |
| 5 | 2 hours later |
| 6 | 5 hours later |
| 7 | 10 hours later |
| 8 | 10 hours later |

Two things switch an address off:

- **`410 Gone`**, at once. Answer with it when you retire an address on purpose.
- **5 days of failing** without a single delivery getting through. ClearHire emails you the last error, with a
  way to switch the address back on.

## How do you test, replay and pause?

- **Send a test event** to post `webhook.test` to the address now.
- The **delivery log** on each address lists every attempt: its status, attempt number, the response code, how
  long it took and when the next retry is due.
- **Replay** sends a delivery again with the same `webhook-id`, so your repeat check still works. After an
  outage, replay the failed ones to catch up.
- **Pause** stops sending to an address until you resume it.

> Built and maintained by [the ClearHire team](/about-the-author) — [aoneahsan.com](https://aoneahsan.com) · [GitHub](https://github.com/aoneahsan).
