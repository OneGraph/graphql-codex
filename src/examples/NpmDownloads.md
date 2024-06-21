---
description: |
  Cool!
contributedBy: "@sgrove"
variables: ""
title: "NpmDownloads"
result: |
  "{\"errors\":[{\"message\":\"Missing auth for GitHub. Please reauthenticate.\",\"path\":[\"npm\",\"package\",\"repository\",\"sourceRepository\"],\"extensions\":{\"service\":\"github\",\"type\":\"auth/missing-auth\",\"traceId\":\"e5242891-c0ef-46a6-9240-fe82db85ccd6\"}}],\"data\":{\"npm\":{\"package\":{\"name\":\"graphql\",\"downloads\":{\"lastMonth\":{\"count\":18748116}},\"repository\":{\"sourceRepository\":null}}}}}"
---

```graphql
query NpmDownloads($name: String = "graphql") {
  npm {
    package(name: $name) {
      name
      downloads {
        lastMonth {
          count
        }
      }
      repository {
        sourceRepository {
          ... on GitHubRepository {
            id
            name
          }
        }
      }
    }
  }
}

query Rss(
  $url: String = "https://www.heavybit.com/category/library/podcasts/jamstack-radio/feed/"
) {
  rss {
    rss2Feed(url: $url) {
      items {
        title
        content
        enclosure {
          length
          url
        }
      }
    }
  }
}

mutation PlaySpotifySong(
  $trackId: String!
  $positionMs: Int = 0
) {
  spotify {
    playTrack(
      input: {
        trackIds: [$trackId]
        positionMs: $positionMs
      }
    ) {
      player {
        isPlaying
        progressMs
        item {
          id
          name
        }
      }
    }
  }
}

subscription MySubscription {
  npm {
    allPublishActivity {
      package {
        id
        name
        description
        repository {
          sourceRepository {
            ... on GitHubRepository {
              id
              name
              issues(
                first: 10
                orderBy: {
                  field: CREATED_AT
                  direction: DESC
                }
                states: OPEN
              ) {
                totalCount
              }
            }
          }
        }
      }
    }
  }
}

```
