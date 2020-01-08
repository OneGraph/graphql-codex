---
description: |
  You can build a podcast player with GraphQL simply by passing in a `$url` param, for example:
  
  ```
  {"url": "https://feeds.simplecast.com/tRYUp5wn"}
  ```
  ```
contributedBy: "@sgrove"
variables: "{}"
---

```graphql
query RssFeed($url: String!) {
  rss {
    rss2Feed(url: $url) {
      title
      items {
        title
        ## Enclosure contains the link to the podcast audio
        enclosure {
          url # Use this in an <audio src=""> tag for a podcast player!
          length
          mime
        }
        content
        description
      }
    }
  }
}

```
