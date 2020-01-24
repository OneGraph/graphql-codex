---
description: |
  Tell if a user is logged in (either via an `$apiKey` or the OAuth flow).
  
  You can find or create your DEV.to API keys in [the settings menu on dev.to](https://dev.to/settings/account)
contributedBy: "@sgrove"
variables: ""
title: "AmILoggedIntoDevTo"
result: |
  "{\"data\":{\"me\":{\"devTo\":{\"isLoggedIn\":true}}}}"
---

```graphql
query AmILoggedIntoDevTo($apiKey: String) {
  me(auths: { devToAuth: { apiKey: $apiKey } }) {
    devTo {
      isLoggedIn
    }
  }
}

```
