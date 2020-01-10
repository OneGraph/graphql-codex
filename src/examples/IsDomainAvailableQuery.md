---
description: |
  Yay
contributedBy: "@sgrove"
variables: "{"domain":"onegraph.com"}"
title: "IsDomainAvailableQuery"
result: ""{\"data\":{\"zeit\":{\"domainAvailable\":{\"available\":false}}}}""
---

```graphql
query IsDomainAvailableQuery {
  zeit {
    domainAvailable(name: "onegraph.com") {
      available
    }
  }
}

```
