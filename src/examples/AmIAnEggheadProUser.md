---
description: |
  This will tell whether the user is logged into Egghead and if they're a pro user.
contributedBy: "@sgrove"
variables: ""
title: "AmIAnEggheadProUser"
result: |
  "{\"data\":{\"me\":{\"eggheadio\":{\"isPro\":false,\"id\":255055}}}}"
---

```graphql
query AmIAnEggheadProUser {
  me {
    eggheadio {
      isPro
      id
    }
  }
}

```
