---
description: |
  asdf
contributedBy: "@sgrove"
variables: "{"name": true,"name": 
  
  
  
  
"id": "ASdfasdf"}"
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
