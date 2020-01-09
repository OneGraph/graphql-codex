---
description: |
  asdfasdf
contributedBy: "@sgrove"
variables: "{}"
---

```graphql
query Enrich2($email: String!, $apiKey: String!) {
  clearbit(auths: { clearbitAuth: $apiKey }) {
    enrich(email: $email, company:"OneGraph") {
      person {
        bio
        avatar(id: "ya", r: 199, b:20)
        location(a: "boo")
        name {
          familyName
          fullName
          givenName
        }
      }
    }
  }
}
query Enrich($email: String!, $apiKey: String!) {
  clearbit(auths: { clearbitAuth: $apiKey }) {
    enrich(email: $email, company:"OneGraph;./[]") {
      person {
        bio
        avatar(id: "ya", r: 199, b:2000)
        location(a: "boo")
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
