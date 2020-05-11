---
description: |
  Lists all of the webhooks you've created on DEV.to
  
  You can find or create your DEV.to API keys in [the settings menu on dev.to](https://dev.to/settings/account)
contributedBy: "@sgrove"
variables: ""
title: "FindMyDevToWebhooks"
result: |
  "{\"data\":{\"me\":{\"devTo\":{\"webhooks\":[{\"id\":656,\"source\":\"OG1\",\"targetUrl\":\"https://postb.in/1579902190947-0645356504246\",\"events\":[\"article_created\",\"article_updated\"],\"createdAt\":\"2020-01-24T22:01:37Z\"}]}}}}"
---

```graphql
query FindMyDevToWebhooks($apiKey: String!) {
  me(auths: { devToAuth: { apiKey: $apiKey } }) {
    devTo {
      webhooks {
        id
        source
        targetUrl
        events
        createdAt
      }
    }
  }
}

```
