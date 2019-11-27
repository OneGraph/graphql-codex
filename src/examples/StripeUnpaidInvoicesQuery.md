---
description: |
  List unpaid invoices on Stripe.
---

```graphql
query StripeInvoicesQuery {
  stripe {
    invoices(first: 10, status: open) {
      nodes {
        amountDue
        paid
        customer {
          ... on StripeCustomer {
            email
            description
          }
        }
      }
    }
  }
}
```
