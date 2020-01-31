---
description: |
  Buys a new domain!
contributedBy: "@sgrove"
variables: "{\"domain\":\"graphql-san-francisco-meetup-2020.com\"}"
title: "BuyDomainOnZeit"
result: |
  "{\"data\":{\"zeit\":{\"purchaseDomain\":{\"success\":true}}}}"
---

```graphql
mutation BuyDomainOnZeit($domain: String!) {
  zeit {
    purchaseDomain(
      data: { name: $domain, expectedPrice: 12 }
    ) {
      success
    }
  }
}

```
