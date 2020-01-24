---
description: |
  Creates an (unpublished) article on DEV.to
  
  See the [Publishing and Unpublishing](SetDevToArticlePublished) example for how to publish the article after creating it.
contributedBy: "@sgrove"
variables: ""
title: "CreateDevToArticle"
result: |
  "{\"data\":{\"devTo\":{\"createArticle\":{\"article\":{\"bodyHtml\":\"<p>Just use OneGraph, of course!</p>\\n\\n\",\"bodyMarkdown\":\"Just use OneGraph, of course!\",\"id\":248156,\"slug\":\"posting-articles-to-dev-to-from-any-programming-language-via-graphql-an-exhaustive-guide-240-temp-slug-3404323\",\"tags\":[\"graphql\",\"onegraph\"],\"url\":\"https://dev.to/sgrove/posting-articles-to-dev-to-from-any-programming-language-via-graphql-an-exhaustive-guide-240-temp-slug-3404323\"}}}}}"
---

```graphql
mutation CreateDevToArticle($apiKey: String!) {
  devTo(auths: { devToAuth: { apiKey: $apiKey } }) {
    createArticle(
      input: {
        article: {
          title: "Posting articles to dev.to from any programming language via GraphQL: An Exhaustive Guide"
          bodyMarkdown: "Just use OneGraph, of course!"
          tags: ["graphql", "onegraph"]
        }
      }
    ) {
      article {
        bodyHtml
        bodyMarkdown
        id
        slug
        tags
        url
      }
    }
  }
}

```
