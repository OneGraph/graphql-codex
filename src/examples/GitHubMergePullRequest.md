---
description: |
  Merge a GitHub pull request by its number with `$title` as the commit message.
  
  Note as a precaution against merging a PR into the wrong target, you'll need to provide the current sha of the target branch head. You can find the sha under the `headRef.oid` field of the Pull Request, as per the [GitHubGetPullRequest example](GitHubGetPullRequest)
  
  To merge the first PR on the [OneGraph GraphQL Docs Repository](https://github.com/OneGraph/graphql-docs/pulls/1), we could pass in the following variables:
  
  ```javascript
  {
    "repoName": "graphql-docs",
    "repoOwner": "OneGraph",
    "number": 1,
    "title": "Merge the GitHub examples, thanjk you @dwwoelfel!",
    "sha": "44d4e20fd739f486411049b7e94849d7b3332770"
  }
  ```
---

```graphql
mutation MergePullRequest(
  $repoOwner: String!
  $repoName: String!
  $number: Int!
  $sha: String!
  $title: String!
) {
  gitHub {
    mergePullRequest_oneGraph(
      input: {
        repoOwner: $repoOwner
        repoName: $repoName
        number: $number
        sha: $sha
        commitTitle: $title
      }
    ) {
      pullRequest {
        id
        title
        merged
        state
      }
    }
  }
}
```
