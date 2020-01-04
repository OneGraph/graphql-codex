---
description: |
  Create a single commit on the GitHub project `${repoOwner}/${repoName}` that "upserts" (creates a new file if it doesn't exist, or updates it if it does).
  
  For example, to add a new file "/examples/MyExample.md" to the [OneGraph GraphQL Docs Repository](https://github.com/OneGraph/graphql-docs/tree/master/src/examples), the following variables would work:
  
  ```javascript
  {
    "repoName": "graphql-docs",
    "repoOwner": "OneGraph",
    "branchName": "master",
    "path": "src/examples/MyExample.md",
    "message": "Adding a new example",
    "content": "Example file content here",
    "sha": null
  }
  ```
  
  Note that if you're _updating_ a file, you'll need to provide its *current* sha for the mutation to succeed. See the [GitHubGetFileShaAndContent example](GitHubGetFileShaAndContent) for how to find an existing file's sha.
---

```graphql
mutation UpdateFileMutation(
  $repoOwner: String!
  $repoName: String!
  $branchName: String!
  $path: String!
  $message: String!
  $content: String!
  $sha: String!
) {
  gitHub {
    createOrUpdateFileContent_oneGraph(
      input: {
        message: $message
        path: $path
        repoName: $repoName
        repoOwner: $repoOwner
        branchName: $branchName
        plainContent: $content
        existingFileSha: $sha
      }
    ) {
      commit {
        message
      }
    }
  }
}
```
