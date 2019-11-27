---
description: |
  Get all boards and cards on Trello for a given user.
---

```graphql
query TrelloListBoardsQuery {
  trello {
    member(username: "spolsky") {
      boards {
        nodes {
          name
          cards {
            nodes {
              name
            }
          }
        }
      }
    }
  }
}
```
