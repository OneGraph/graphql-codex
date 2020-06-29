---
description: |
  Tell if a user is logged in (either via an `$apiKey` or the OAuth flow).
  
  Note: We'll deprecate this field in favor of `id` as with our other integrations if/when DEV adds an endpoint to retrieve information about the currently logged in user. However, this field can be safely relied on to work even after that happens.
  
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
