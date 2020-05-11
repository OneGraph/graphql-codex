---
description: |
  Create a video asset on Mux with a source video, an image overlay, and textual subtitles.
  
  You'll need your Mux access token `id`/`secret` for the variables:
  
  ```
  {
    "secret": "mymuxsecret"
    "tokenId": "mytokenid"
  }
  ```
contributedBy: "@sgrove"
variables: ""
title: "MuxCreateVideoAsset"
result: |
  "{\"data\":{\"mux\":{\"createAsset_oneGraph\":{\"asset\":{\"isLive\":null,\"id\":\"J900b7BP98qGq02Gg4XOow016CcQFre6Xgu\",\"isTest\":null,\"errors\":null,\"playbackIds\":[{\"id\":\"N2FjJyADSs02JSN2LWdsQoxvJPSRW401Cm\",\"policy\":\"PUBLIC\"}],\"status\":\"preparing\"}}}}}"
---

```graphql
mutation MuxCreateVideoAsset(
  $secret: String!
  $tokenId: String!
) {
  mux(
    auths: {
      muxAuth: {
        accessToken: { secret: $secret, tokenId: $tokenId }
      }
    }
  ) {
    createAsset_oneGraph(
      input: {
        # The source video to start with (thanks to http://techslides.com/sample-webm-ogg-and-mp4-video-files-for-html5 for providing this!)
        sourceUrl: "http://techslides.com/demos/sample-videos/small.mp4"
        # Any images we want to overlay on top of the video
        imageInputs: [
          {
            url: "https://avatars2.githubusercontent.com/u/35296?s=460&u=9753e52e664dba2ab83b2c08b9a6cc90a5cac7bb&v=4"
            overlaySettings: {
              verticalAlign: BOTTOM
              horizontalAlign: LEFT
              verticalMargin: "5%"
              horizontalMargin: "5%"
              width: "15%"
              height: "15%"
            }
          }
        ]
        # Subtitles or closed captions: each will be included as a separate option in the final video
        textualInputs: [
          {
            url: "https://egghead.io/api/v1/lessons/graphql-use-graphql-primitive-types/subtitles"
            textType: SUBTITLES
            languageCode: "en"
            name: "English"
            passthrough: "Data attached to this subtitle resource"
          }
        ]
        # Metadata to control permissions for the playback, to attach some custom data to the resource, set the mp4 support level, etc.
        settings: {
          isTest: false
          masterAccess: TEMPORARY
          mp4Support: STANDARD
          normalizeAudio: true
          passthrough: "{\"json-also-works\": true}"
          perTitleEncode: true
          playbackPolicy: PUBLIC
          demo: false
        }
      }
    ) {
      # Our created asset!
      asset {
        ...MuxVideoAssetFragment
      }
    }
  }
}

fragment MuxVideoAssetFragment on MuxVideoAsset {
  isLive
  id
  isTest
  errors {
    type
    messages
  }
  playbackIds {
    id
    policy
  }
  status
}

```
