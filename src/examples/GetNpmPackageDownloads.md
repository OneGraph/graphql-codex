---
description: |
  asdf
contributedBy: "@sgrove"
variables: "{}"
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
