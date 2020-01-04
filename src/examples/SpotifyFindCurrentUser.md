---
description: |
  Find the currently logged-in Spotify user's email, name, profile image, etc. from GraphQL!
---

```graphql
## Find some information about the currently logged-in
## Spotify user.
query AboutMe {
  me {
    spotify {
      birthdate
      country
      displayName
      email
      href
      id
      images {
        height
        url
        width
      }
      product
      type
      uri
    }
  }
}
```
