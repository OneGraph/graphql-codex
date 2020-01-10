---
description: |
  Check if a domain is available on Zeit
contributedBy: "@sgrove"
variables: "{\"domain\":\"onegraph.com\"}"
title: "IsDomainAvailableQueryOnZeit"
result: ""{\"data\":{\"zeit\":{\"domainAvailable\":{\"available\":false}}}}""
---

```graphql
query IsDomainAvailableQuery($domain: String!) {
  zeit {
    domainAvailable(name: $domain) {
      available
    }
  }
}

```
