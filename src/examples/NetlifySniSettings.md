---
description: |
  Find some stuff!
contributedBy: "@sgrove"
variables: ""
title: "NetlifySniSettings"
result: |
  null
---

```graphql
query NetlifySniSettings($siteId: String!) {
  netlify {
    site(id: $siteId) {
      sniCertificates {
        state
        domains
        createdAt
        updatedAt
        expiresAt
      }
    }
  }
}

```
