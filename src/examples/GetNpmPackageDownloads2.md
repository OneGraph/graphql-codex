---
description: |
  123
contributedBy: "@sgrove"
variables: ""
title: "GetNpmPackageDownloads2"
---

```graphql
query GetNpmPackageDownloads($name: String!) {
  npm {
    package(name: $name) {
      downloads {
        lastMonth {
          count # ok
        }
      }
    }
  }
}

```
