---
description: |
  List open conversations on Intercom.
---

```graphql
query IntercomOpenConversations {
  intercom {
    conversations(
      displayAsPlaintext: true
      orderBy: ASC
      sortByField: WAITING_SINCE
    ) {
      nodes {
        conversationMessage {
          body
        }
        customers {
          name
          email
        }
      }
    }
  }
}
```
