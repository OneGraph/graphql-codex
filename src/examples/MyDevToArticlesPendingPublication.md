---
description: |
  Finds all articles I've written on DEV.to (sorted by recency) that haven't been published yet.
contributedBy: "@sgrove"
variables: ""
title: "MyDevToArticlesPendingPublication"
result: |
  null
---

```graphql
query MyDevToArticlesPendingPublication($apiKey: String!) {
  me(auths: { devToAuth: { apiKey: $apiKey } }) {
    devTo {
      articles(publishStatus: UNPUBLISHED) {
        nodes {
          id
          title
          bodyMarkdown
        }
      }
    }
  }
}

```
