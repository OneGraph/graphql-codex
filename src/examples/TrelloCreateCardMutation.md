---
description: |
  Add a new card to a Trello list.
---

```graphql
mutation TrelloCreateCardMutation {
  trello {
    createCard(
      input: {
        idList: "REPLACE_WITH_LIST_ID"
        name: "New card created from OneGraph"
      }
    ) {
      card {
        id
        name
        url
      }
    }
  }
}
```
