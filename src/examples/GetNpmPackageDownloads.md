---
description: |
  Get the downloads for a package on npm given the package name
contributedBy: "@sgrove"
variables: "{}"
---

```graphql
query GetNpmPackageDownloads($name: String!) {
  npm {
    package(name: $name) {
      downloads {
        lastMonth {
          count
        }
      }
    }
  }
}

```
