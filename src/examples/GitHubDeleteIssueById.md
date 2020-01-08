
---
description: |
  You'll need to find the GitHub issue id first (see the [GitHubFindIssueIdByNumber](GitHubFindIssueIdByNumber) example) to use as the argument to `issueId`.

Since issue ids are globally unique across every kind of object in GitHub, you won't need to add the repository owner/name, just the `id`!

  ```javascript
  {
    "id": "MDU6SXNzdWU1NDUyNDk2ODg="
  }
  ```
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
