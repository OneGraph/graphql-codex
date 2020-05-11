---
description: |
  Destroys a webhook on DEV.to by its `id`.
  
  See the counter example on [Creating a Webhook on DEV.to](CreateDevToWebhook).
  
  You can find or create your DEV.to API keys in [the settings menu on dev.to](https://dev.to/settings/account)
contributedBy: "@sgrove"
variables: "{\"apiKey\":\"DEV_TO_API_KEY\",\"id\":658}"
title: "DestroyDevToWebhook"
result: |
  "{\"data\":{\"devTo\":{\"destroyWebhook\":{\"webhook\":{\"id\":658,\"source\":\"OneGraph\",\"targetUrl\":\"https://websmee.com/hook/dev-to-example?_websmee_inspect\",\"events\":[\"article_created\",\"article_updated\"],\"createdAt\":\"2020-01-24T23:18:50Z\",\"user\":{\"name\":\"Sean Grove\",\"username\":\"sgrove\",\"twitterUsername\":\"sgrove\",\"githubUsername\":\"sgrove\",\"websiteUrl\":null,\"profileImage\":\"https://res.cloudinary.com/practicaldev/image/fetch/s--PWJgQmTK--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/321819/92094dd1-5a81-466e-888f-c6838241d974.jpg\",\"profileImage90\":\"https://res.cloudinary.com/practicaldev/image/fetch/s--8I8R4Rm1--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/321819/92094dd1-5a81-466e-888f-c6838241d974.jpg\"}}}}}}"
---

```graphql
mutation DestroyDevToWebhook($apiKey: String!, $id: Int!) {
  devTo(auths: { devToAuth: { apiKey: $apiKey } }) {
    destroyWebhook(input: { id: $id }) {
      webhook {
        id
        source
        targetUrl
        events
        createdAt
        user {
          name
          username
          twitterUsername
          githubUsername
          websiteUrl
          profileImage
          profileImage90
        }
      }
    }
  }
}

```
