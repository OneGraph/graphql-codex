---
description: |
  List Intercom conversations for users that have been active recently.
---

```graphql
query IntercomUsersWithConversationsQuery {
  intercom {
    users(first: 10, orderBy: DESC, sortByField: LAST_REQUEST_AT) {
      nodes {
        email
        conversations(displayAsPlaintext: true) {
          nodes {
            id
            conversationMessage {
              body
            }
          }
        }
      }
    }
  }
}
```
