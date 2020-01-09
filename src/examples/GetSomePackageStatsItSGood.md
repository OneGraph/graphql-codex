---
description: |
  Boooooooom
contributedBy: "@sgrove"
variables: "{}"
---

```graphql
query GetNpmPackageDownloads($name: String!) {
  npm {
    package(name: $name) {
      downloads {
        lastMonth(a:"",b:"Asdfasdf",c:"234r23w") {
          count # ok
        }
      }
    }
  }
}

```
