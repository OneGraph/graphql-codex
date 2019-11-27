---
description: |
  Add a new comment on a GitHub issue.
---

```graphql
mutation GitHubCreateIssueCommentMutation {
  gitHub {
    addComment(
      input: {
        body: "Comment added from OneGraph"
        subjectId: "MDU6SXNzdWU0MTQ4ODg3MTM="
      }
    ) {
      commentEdge {
        node {
          body
          url
        }
      }
    }
  }
}
```
