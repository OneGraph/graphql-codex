---
description: |
  Add a comment to a pull request given its id - see the [GitHubGetPullRequest example](GitHubGetPullRequest) for how to find a PR's id given its repository and number.
---

```graphql
mutation AddPullRequestCommentMutation(
  $pullRequestId: ID!
  $body: String!
) {
  gitHub {
    addComment(
      input: { body: $body, subjectId: $pullRequestId }
    ) {
      subject {
        ... on GitHubPullRequest {
          id
          title
          comments {
            nodes {
              id
              body
            }
          }
        }
      }
    }
  }
}

```
