---
description: |
  Get the (textual) value of a file in a GitHub repo via GraphQL
  - `$branchAndFilePath` should be formatted as `${branchName}:${filePath without the leading '/'}`
  
  Note that the `text` field will be null if the file is a binary blog (such as an image).
  
  If you need to read the binary content, email [support@onegraph.com](mailto:support@onegraph.com?subject=Can you add a base64-encoded binary content field to the `GitHubBlob` type on OneGraph?) and we can stitch in the [corresponding REST endpoint](https://developer.github.com/v3/git/blobs/#get-a-blob)
---

```graphql
query GetFileTextContentsQuery($repoName: String!, $repoOwner: String!, $branchAndFilePath: String = "master:README.md") {
  gitHub {
    repository(name: $repoName, owner: $repoOwner) {
      object_: object(expression: $branchAndFilePath) {
        ... on GitHubBlob {
          sha: oid # alias this to `sha`, as that's a bit more familiar
          byteSize
          isBinary
          # Note the text content will be null if
          # `isBinary` is true
          text
        }
      }
    }
  }
}
```
