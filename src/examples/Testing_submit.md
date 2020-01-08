---
description: |
  Just a dummy example for now
contributedBy: "@sgrove"
variables: "{}"
---

```graphql
query EnrichEmailWithClearbi(
  $apiKey: String!
  $email: String!
) {
  clearbit(auths: { clearbitAuth: $apiKey }) {
    enrich(email: $email) {
      person {
        bio
        avatar(id: "abc", age: 10)
        location
        name {
          familyName
          fullName
          givenName
        }
      }
    }
  }
}
```
