---
description: |
  Get a list of Pull Requests filtered by a tag
contributedBy: "@sgrove"
variables: "{\"labelableId\":\"MDU6SXNzdWU1NzY1OTM2MTY=\",\"labelIds\":[\"MDU6TGFiZWwxODkwODQwNjIw\"]}"
title: "GetPullRequestsQuery"
result: |
  null
---

```graphql
query GetPullRequestsQuery(
  $filterTag: [String!]
  $repoName: String!
  $repoOwner: String!
  $limit: Int!
) {
  gitHub {
    repository(name: $repoName, owner: $repoOwner) {
      pullRequests(
        orderBy: { direction: DESC, field: CREATED_AT }
        first: $limit
        states: OPEN
        labels: $filterTag
      ) {
        nodes {
          number
          id
          title
          body
          isCrossRepository
          comments(last: 20) {
            nodes {
              id
              bodyText
              author {
                login
                avatarUrl
              }
              createdAt
            }
          }
          baseRefName
          headRef {
            prefix
            name
            id
            target {
              id
              oid
              repository {
                owner {
                  login
                  id
                }
              }
            }
          }
        }
      }
    }
  }
}

```
