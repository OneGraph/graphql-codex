---
description: |
  Finds a few details about the user if they're logged into Twitch:
  
  - Twitch `userId`
  - email
  - whether the email has been verified by Twitch (`emailVerified`)
  - The display name (what you'd see in the Twitch chat)
contributedBy: "@sgrove"
variables: ""
title: "FindMyTwitchUserIdAndEmail"
result: |
  "{\"data\":{\"me\":{\"twitchTv\":{\"id\":\"258615874\",\"email\":\"sean.s.grove+twitchtv@gmail.com\",\"emailVerified\":true,\"displayName\":\"seangrove_io\"}}}}"
---

```graphql
query FindMyTwitchUserIdAndEmail {
  me {
    twitchTv {
      id
      email
      emailVerified
      displayName
    }
  }
}

```
