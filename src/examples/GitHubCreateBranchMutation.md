---
description: |
  Create a branch name `$branchName` (from `master`) on the GitHub project `${repoOwner}/${repoName}`
---

```graphql
mutation CreateBranchMutation(
  $repoOwner: String!
  $repoName: String!
  $branchName: String!
) {
  gitHub {
    createBranch_oneGraph(
      input: {
        branchName: $branchName
        repoName: $repoName
        repoOwner: $repoOwner
      }
    ) {
      ref_: ref {
        name
        id
      }
    }
  }
}
```
