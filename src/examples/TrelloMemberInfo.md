---
description: |
  Get profile information on a Trello user.
---

```graphql
query TrelloMemberInfo {
  trello {
    member(username: "spolsky") {
      fullName
      bio
      avatarUrl
      url
      email
    }
  }
}
```
