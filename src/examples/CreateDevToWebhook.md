---
description: |
  Creates a webhook that will be notified whenever an article is created or published on DEV.to
  
  See the counter example on [Destroying a Webhook on DEV.to](DestroyDevToWebhook).
  
  You can find or create your DEV.to API keys in [the settings menu on dev.to](https://dev.to/settings/account)
contributedBy: "@sgrove"
variables: ""
title: "CreateDevToWebhook"
result: |
  "{\"data\":{\"devTo\":{\"createWebhook\":{\"webhook\":{\"typeOf\":\"webhook_endpoint\",\"id\":658,\"source\":\"OneGraph\",\"targetUrl\":\"https://websmee.com/hook/dev-to-example?_websmee_inspect\",\"events\":[\"article_created\",\"article_updated\"],\"createdAt\":\"2020-01-24T23:18:50Z\"}}}}}"
---

```graphql
mutation CreateDevToWebhook($apiKey: String!) {
  devTo(auths: { devToAuth: { apiKey: $apiKey } }) {
    createWebhook(
      input: {
        webhookEndpoint: {
          source: "OneGraph"
          targetUrl: "https://websmee.com/hook/dev-to-example?_websmee_inspect"
          events: [
            "article_created"
            "article_updated"
          ]
        }
      }
    ) {
      webhook {
        typeOf
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
