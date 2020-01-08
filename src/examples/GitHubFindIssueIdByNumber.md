
---
description: |
  Given a repository `$repoOwner`/`$repoName`, find the id of an issue by its `$number`.

Usually users think of "issue #10", but most GitHub GraphQL mutations refer to issues by their id, so you'll find this query quite helpful! For example, you'll need the issue id if you want to [Delete a GitHub issue](GitHubDeleteIssue).


To find the id of issue #3 on the [OneGraph GraphQL Docs Repository](https://github.com/OneGraph/graphql-docs/issues/1), we could pass in the following variables:
  
  ```javascript
  {
    "repoName": "graphql-docs",
    "repoOwner": "OneGraph",
    "number": 3
  }
  ```

contributedBy: @sgrove
---

```graphql
query GitHubFindIssueIdByNumber(
  $repoOwner: String!
  $repoName: String!
  $number: Int!
) {
  gitHub {
    repository(owner: $repoOwner, name: $repoName) {
      issue(number: $number) {
        id
        title
      }
    }
  }
}

```
