---
description: |
  Get the details of a pull request by its number.
  
  Also see:
  - how to [Merge a Pull Request](GitHubMergePullRequest)
  - how to [Add a comment to a Pull Request](GitHubAddPullRequestComment)
  
---

```graphql
query GetPullRequest {
  gitHub {
    repository(owner: "OneGraph", name: "graphql-docs") {
      pullRequest(number: 1) {
        id # The `id` is useful if you want to add a comment to the PR
        headRefOid # The `headRefOid` sha is useful if you need to merge this PR
        title
        state
      }
    }
  }
}

```
