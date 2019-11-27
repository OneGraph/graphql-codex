---
description: |
  List Opportunities on Salesforce, where the account has more then 10 employees.
---

```graphql
query SalesforceOpportunitiesQuery {
  salesforce {
    opportunities(
      first: 10
      filter: {account: {numberOfEmployees: {greaterThan: 10}}}
    ) {
      nodes {
        name
        expectedRevenue
        probability
        stageName
        account {
          name
          numberOfEmployees
        }
      }
    }
  }
}
```
