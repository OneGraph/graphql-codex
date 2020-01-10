---
description: |
  123
contributedBy: "@sgrove"
variables: "{"name":true,"df":10}"
title: "GetNpmPackageDownloads"
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
