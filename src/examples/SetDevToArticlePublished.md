---
description: |
  Publishes (and un-publishes) an article by its `id` (`$articleId`).
  
  You can find or create your DEV.to API keys in [the settings menu on dev.to](https://dev.to/settings/account)
contributedBy: "@sgrove"
variables: "{\"apiKey\":\"DEV_TO_API_KEY\",\"articleId\":248156,\"isPublished\":true}"
title: "SetDevToArticlePublished"
result: |
  "{\"data\":{\"devTo\":{\"setArticlePublished\":{\"article\":{\"bodyHtml\":\"<p>Just use OneGraph, of course!</p>\\n\\n\",\"bodyMarkdown\":\"Just use OneGraph, of course!\",\"id\":248156,\"slug\":\"posting-articles-to-dev-to-from-any-programming-language-via-graphql-an-exhaustive-guide-56ek\",\"tags\":[\"graphql\",\"onegraph\"],\"publishedAt\":\"2020-01-24T23:11:55Z\",\"publishedTimestamp\":\"2020-01-24T23:11:55Z\",\"url\":\"https://dev.to/sgrove/posting-articles-to-dev-to-from-any-programming-language-via-graphql-an-exhaustive-guide-56ek\"}}}}}"
---

```graphql
mutation SetDevToArticlePublished(
  $apiKey: String!
  $articleId: Int!
  $isPublished: Boolean!
) {
  devTo(auths: { devToAuth: { apiKey: $apiKey } }) {
    setArticlePublished(
      input: { id: $articleId, published: $isPublished }
    ) {
      article {
        bodyHtml
        bodyMarkdown
        id
        slug
        tags
        publishedAt
        publishedTimestamp
        url
      }
    }
  }
}

```
