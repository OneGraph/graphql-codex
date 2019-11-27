---
description: |
  List refunds with charge and customer info on Stripe.
---

```graphql
query StripeListRefundsQuery {
  stripe {
    refunds {
      nodes {
        reason
        amount
        status
        charge {
          customer {
            ... on StripeCustomer {
              email
            }
          }
        }
      }
    }
  }
}
```
