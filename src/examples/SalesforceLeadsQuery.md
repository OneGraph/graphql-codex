---
description: |
  List leads on Salesforce, ordered by when they were created.
---

```graphql
query SalesforceLeadsQuery {
  salesforce {
    leads(sortByField: CREATED_DATE, orderBy: DESC, first: 10) {
      nodes {
        firstName
        lastName
        email
        createdDate
      }
    }
  }
}
```
