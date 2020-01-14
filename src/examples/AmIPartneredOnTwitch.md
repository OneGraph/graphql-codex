---
description: |
  Find if I'm partnered on Twitch (meaning I can take a cut of ad revenue)
contributedBy: "@sgrove"
variables: ""
title: "AmIPartneredOnTwitch"
result: |
  "{\"data\":{\"me\":{\"twitchTv\":{\"id\":\"258615874\",\"partnered\":false}}}}"
---

```graphql
query AmIPartneredOnTwitch {
  me {
    twitchTv {
      id
      partnered
    }
  }
}

```
