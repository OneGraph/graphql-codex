---
description: |
  Find a user name on Twitch
contributedBy: "@sgrove"
variables: "{}"
title: "WhatsMyNameOnTwitch"
result: |
  "{\"data\":{\"me\":{\"twitchTv\":{\"name\":\"seangrove_io\"}}}}"
---

```graphql
query WhatsMyNameOnTwitch {
  me {
    twitchTv {
      name
    }
  }
}

```
