---
description: |
  Issue a refund for a charge on Stripe.
---

```graphql
mutation StripeIssueRefundMutation {
  stripe {
    refundCharge(data: {chargeId: "YOUR_CHARGE_ID"}) {
      refund {
        amount
        charge {
          customer {
            ... on StripeCustomer {
              email
            }
          }
        }
        id
      }
    }
  }
}
```
