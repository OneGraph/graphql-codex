
---
description: |
  Just a dummy example for now
---

```graphql
query FindMe {
  me {
    github {
      name
      login
    }
  }
  __typename
  gitHub {
    search(
      query: "org:OneGraph author:dwwoelfel type:pr is:merged"
      type: ISSUE
      first: 10
    ) {
      issueCount
    }
  }
}

# This isn't very useful
query Two {
  __typename
}
```
