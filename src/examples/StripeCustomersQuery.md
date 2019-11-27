---
description: |
  List customers on Stripe.
---

```graphql
query StripeCustomersQuery {
  stripe {
    customers {
      nodes {
        email
        description
      }
    }
  }
}
```
