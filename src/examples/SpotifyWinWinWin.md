---
description: |
  Get pumped at GraphQL Asia!
contributedBy: "@sgrove"
variables: "{\"trackId\":\"0RIHDrcRAXtUlnkvTYPW1a\"}"
title: "SpotifyWinWinWin"
result: |
  "{\"data\":{\"spotify\":{\"playTrack\":{\"player\":{\"isPlaying\":true}}}}}"
---

```graphql
mutation WinWinWin($trackId: String!) {
  spotify {
    playTrack(
      input: {
        trackIds: [$trackId]
        positionMs: 69500
      }
    ) {
      player {
        isPlaying
      }
    }
  }
}
```
