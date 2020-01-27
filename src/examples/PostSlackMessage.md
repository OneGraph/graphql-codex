---
description: |
  Posts a nice message to the `#general` channel
contributedBy: "@sgrove"
variables: "{\"message\":\"Hello Slack!\"}"
title: "PostSlackMessage"
result: |
  null
---

```graphql
mutation PostMessage($message: String!) {
  slack {
    postMessage(data: { channel: "#general", text: $message }) {
      ok
      ts
    }
  }
}

```
