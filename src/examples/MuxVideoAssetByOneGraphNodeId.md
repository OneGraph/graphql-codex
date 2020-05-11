---
description: |
  Look up a Mux video asset directly by its oneGraphNodeId.
  
  You'll need your Mux access token `id`/`secret` for the variables:
  
  ```
  {
    "secret": "mymuxsecret"
    "tokenId": "mytokenid"
  }
  ```
contributedBy: "@sgrove"
variables: ""
title: "MuxVideoAssetByOneGraphNodeId"
result: |
  "{\"data\":{\"oneGraphNode\":{\"isLive\":null,\"id\":\"r3H7AVy1CwrvKpT02rtuyC43U4KDaF7Hv\",\"isTest\":null,\"errors\":null,\"playbackIds\":[{\"id\":\"LG01rZyoh455cbs1AvIK6mMj4k013rXCbx\",\"policy\":\"PUBLIC\"}],\"status\":\"ready\",\"oneGraphId\":\"MTptdXg6TVRwTmRYaFdhV1JsYjBGemMyVjBPbkl6U0RkQlZua3hRM2R5ZGt0d1ZEQXljblIxZVVNME0xVTBTMFJoUmpkSWRn\"}}}"
---

```graphql
query MuxVideoAssetByOneGraphNodeId(
  $tokenId: String!
  $secret: String!
  $oneGraphNodeId: ID!
) {
  oneGraphNode(
    auths: {
      muxAuth: {
        accessToken: { secret: $secret, tokenId: $tokenId }
      }
    }
    oneGraphId: $oneGraphNodeId
  ) {
    ... on MuxVideoAsset {
      ...MuxVideoAssetFragment
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
  oneGraphId
}

```
