---
description: |
  List open cases on Salesforce.
---

```graphql
query SalesforceCasesQuery {
  salesforce {
    cases(
      filter: {status: {notEqualTo: "Closed"}}
      sortByField: PRIORITY
      orderBy: ASC
    ) {
      edges {
        node {
          id
          status
          priority
        }
      }
    }
  }
}
```
