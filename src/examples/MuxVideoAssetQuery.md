---
description: |
  Find a VideoAsset on Mux via its id.
  
  You'll need your Mux access token `id`/`secret` for the variables, and the id of your Mux asset:
  
  ```
  {
    "secret": "mymuxsecret"
    "tokenId": "mytokenid"
    "id": "assetId"
  }
  ```
contributedBy: "@sgrove"
variables: ""
title: "MuxVideoAssetQuery"
result: |
  "{\"data\":{\"mux\":{\"video\":{\"asset\":{\"isLive\":null,\"id\":\"fzHswXm02GZTN02WYKHzDLmrjMRt4s00au7\",\"isTest\":true,\"errors\":null,\"playbackIds\":[{\"id\":\"72jcEfy20218m71eMEbe1a00XRWNSB02Gq2\",\"policy\":\"PUBLIC\"}],\"status\":\"ready\"}}}}}"
---

```graphql
query MuxAssetQuery(
  $id: String!
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
    video {
      asset(id: $id) {
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
