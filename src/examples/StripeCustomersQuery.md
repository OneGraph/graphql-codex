---
description: |
  Lists Stripe customers
contributedBy: "@dwwoelfel"
variables: ""
title: "StripeCustomersQuery"
result: |
  null
---

```graphql
query StripeCustomers {
  stripe {
    customers(first: 1) {
      edges {
        node {
          id
          email
          charges(first: 2) {
            edges {
              node {
                id
                amount
                status
              }
            }
          }
        }
      }
    }
  }
}
```
