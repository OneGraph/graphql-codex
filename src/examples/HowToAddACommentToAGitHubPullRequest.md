---
description: |
  Super easy!
contributedBy: "@sgrove"
variables: "{\"body\":\"This is a comment!\",\"pullRequestId\":\"abc123==\"}"
title: "HowToAddACommentToAGitHubPullRequest"
result: |
  null
---

```graphql
mutation AddPullRequestCommentMutation(
  $body: String!
  $pullRequestId: ID!
) {
  gitHub {
    addComment(
      input: { body: $body, subjectId: $pullRequestId }
    ) {
      clientMutationId
      commentEdge {
        node {
          body
        }
      }
    }
  }
}

```
