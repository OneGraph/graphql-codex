
---
description: |
  You'll need to find the GitHub issue id first (see the [GitHubFindIssueIdByNumber](GitHubFindIssueIdByNumber) example) to use as the argument to `issueId`.
contributedBy: @sgrove
---

```graphql
mutation DeleteIssueById($id: ID!) {
  gitHub {
    deleteIssue(input: { issueId: $id }) {
      repository {
        issues(
          first: 0
          orderBy: { direction: DESC, field: CREATED_AT }
        ) {
          totalCount
        }
      }
    }
  }
}
```
