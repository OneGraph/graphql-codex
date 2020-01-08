---
description: |
  Given a GitHub `$repoOwner`/`$repoName`, find if the corresponding repository is fork (`gitHub.repository.isFork`) - and if so, what the original repository is `gitHub.repository.parent.nameWithOwner`.
contributedBy: "@sgrove"
variables: "{}"
---

```graphql
query GitHubIsRepositoryAFork(
  $repoOwner: String!
  $repoName: String!
) {
  gitHub {
    repository(owner: $repoOwner, name: $repoName) {
      id
      ## Is this repository a fork?
      isFork
      parent {
        ## if it is a fork, what's the original?
        nameWithOwner
      }
    }
  }
}

```
