---
description: |
  Create a new user on Intercom.
---

```graphql
mutation IntercomCreateUserMutation {
  intercom {
    createUser(input: {email: "newuser@example.com", name: "New User"}) {
      user {
        id
        email
      }
    }
  }
}
```
