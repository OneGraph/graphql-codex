---
description: |
  Control your Spotify player completely from GraphQL!

  - Find the currently logged-in Spotify user with `AboutMe`
  - Search for matching Spotify tracks (songs) with the GraphQL operation `Search`
  - Use the mutations (`Resume`/`Pause`/`Next`/`Previous`/`Play`) to control the Spotify player
---

```graphql
query Search($query: String!) {
  spotify {
    search(data: { query: $query }) {
      tracks {
        name
        id
        album {
          name
          id
          images {
            height
            url
            width
          }
          href
        }
        href
      }
    }
  }
}

## Find some information about the currently logged-in
## Spotify user.
query AboutMe {
  me {
    spotify {
      birthdate
      country
      displayName
      email
      href
      id
      images {
        height
        url
        width
      }
      product
      type
      uri
    }
  }
}

## Note that by default this will affect the
## currently active device. If you get an error,
## either specify `deviceId`, or start playing
## a song on any of your Spotify devices.
mutation Pause {
  __typename
  spotify {
    pausePlayer {
      player {
        ...Player
      }
    }
  }
}

mutation Resume {
  __typename
  spotify {
    skipNextTrack {
      player {
        ...Player
      }
    }
  }
}

mutation Next {
  __typename
  spotify {
    skipPreviousTrack {
      player {
        ...Player
      }
    }
  }
}

fragment Player on SpotifyPlayer {
  timestamp
  progressMs
  isPlaying
  currentlyPlayingType
  repeatState
  shuffleState
  item {
    id
    name
  }
}

```
