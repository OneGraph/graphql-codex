---
description: |
  List your video asset on Mux (without pagination).
  
  You'll need your Mux access token `id`/`secret` for the variables:
  
  ```
  {
    "secret": "mymuxsecret",
    "tokenId": "mytokenid"
  }
  ```
contributedBy: "@sgrove"
variables: ""
title: "MuxListVideoAssetNoPaginationQuery"
result: |
  "{\"data\":{\"mux\":{\"video\":{\"assets\":{\"edges\":[{\"node\":{\"isLive\":null,\"id\":\"fzHswXm02GZTN02WYKHzDLmrjMRt4s00au7\",\"isTest\":true,\"errors\":null,\"playbackIds\":[{\"id\":\"72jcEfy20218m71eMEbe1a00XRWNSB02Gq2\",\"policy\":\"PUBLIC\"}],\"status\":\"ready\"}},{\"node\":{\"isLive\":null,\"id\":\"8VTcFHVJTgl00I01KuN9DhxCavKKqk57h6\",\"isTest\":true,\"errors\":null,\"playbackIds\":[{\"id\":\"e1f3iw3PO79j6dlHmUFxQLdCfZuC31gJ\",\"policy\":\"PUBLIC\"}],\"status\":\"ready\"}},{\"node\":{\"isLive\":null,\"id\":\"tofrs2N0101nlVpwf01rohw001LddsD301BAN\",\"isTest\":null,\"errors\":null,\"playbackIds\":[{\"id\":\"yoJvjwWVxcniVAkCekQ65EbClKkJ801a6\",\"policy\":\"PUBLIC\"}],\"status\":\"ready\"}},{\"node\":{\"isLive\":null,\"id\":\"oNb9zW9Xg6H00XkKZCyUFmVnPHXcfq3Xm\",\"isTest\":true,\"errors\":null,\"playbackIds\":[{\"id\":\"JhUKQRoP9ofTqHwIxLhQvBXXWTwj00kA5\",\"policy\":\"PUBLIC\"}],\"status\":\"ready\"}},{\"node\":{\"isLive\":null,\"id\":\"qTrd008ALMAil01hqm6SZVEA01f31nGqcix\",\"isTest\":true,\"errors\":null,\"playbackIds\":[{\"id\":\"aIodyDO3ol02QvJBuUlJgXqWWblfwoIRW\",\"policy\":\"PUBLIC\"}],\"status\":\"ready\"}},{\"node\":{\"isLive\":null,\"id\":\"PoDsnF02B8HOHGZLU1nTLNAymea2c02GlG\",\"isTest\":null,\"errors\":null,\"playbackIds\":[{\"id\":\"MTJU5BJU01hSbL00IJzv2DFObKC4mJAKfO\",\"policy\":\"PUBLIC\"}],\"status\":\"ready\"}},{\"node\":{\"isLive\":null,\"id\":\"p4jNpvsJy2q00Sz300CPVczMLeUz02mCOAb\",\"isTest\":null,\"errors\":null,\"playbackIds\":[{\"id\":\"aD01Y00fKHwC79oYm00235ZKMx6y8L2IPRk\",\"policy\":\"PUBLIC\"}],\"status\":\"ready\"}},{\"node\":{\"isLive\":null,\"id\":\"BZAKr023bM1bGpt1QlWbESDB3h4WSWLNe\",\"isTest\":null,\"errors\":null,\"playbackIds\":[{\"id\":\"gBdSCjiJvfdDrfpss5DYvlR4aHvgev85\",\"policy\":\"PUBLIC\"}],\"status\":\"ready\"}},{\"node\":{\"isLive\":null,\"id\":\"9I7V00ZX8JcW2oOFBRDe00MDchamrD578T\",\"isTest\":null,\"errors\":null,\"playbackIds\":[{\"id\":\"FGh7g8Kh93M8js2M3RdaPSfI02BiBkQw7\",\"policy\":\"PUBLIC\"}],\"status\":\"ready\"}},{\"node\":{\"isLive\":null,\"id\":\"lATZSsO01JnWC6Ic5dAPBe25IUUusDyDu\",\"isTest\":null,\"errors\":null,\"playbackIds\":[{\"id\":\"eNHizewhdO00l75t63AIc02bEaaBCNlP1W\",\"policy\":\"PUBLIC\"}],\"status\":\"ready\"}},{\"node\":{\"isLive\":null,\"id\":\"FLF26yQ022VbCIoGipYuZfX6doYGP00MHv\",\"isTest\":null,\"errors\":{\"type\":\"internal_error\",\"messages\":[\"Unexpected internal error creating asset.\"]},\"playbackIds\":[{\"id\":\"2MhffuOvAuel9pF1yFG00NLRzX02lzhwfz\",\"policy\":\"PUBLIC\"}],\"status\":\"errored\"}},{\"node\":{\"isLive\":null,\"id\":\"YkDV004ZpEzc01H5Mh6PHD00QC8VxLfNuOt\",\"isTest\":null,\"errors\":{\"type\":\"internal_error\",\"messages\":[\"Unexpected internal error creating asset.\"]},\"playbackIds\":[{\"id\":\"021ZmaneIG9luXj00LuMjfxgcaykH00zxg02\",\"policy\":\"PUBLIC\"}],\"status\":\"errored\"}},{\"node\":{\"isLive\":null,\"id\":\"02U4efj01TthN8AdqOefns9EZsGpwckcuA\",\"isTest\":null,\"errors\":{\"type\":\"internal_error\",\"messages\":[\"Unexpected internal error creating asset.\"]},\"playbackIds\":[{\"id\":\"Swb47eOAsfO1VCaDq6cuZNjxJSW8C3Jm\",\"policy\":\"PUBLIC\"}],\"status\":\"errored\"}},{\"node\":{\"isLive\":null,\"id\":\"GduVrqYUj3uwEp00NRFExI56e6tQFFEiq\",\"isTest\":null,\"errors\":null,\"playbackIds\":[{\"id\":\"qWAJLiz8q2a4zIEEHGYwTJLzySpM02Vxm\",\"policy\":\"PUBLIC\"}],\"status\":\"ready\"}},{\"node\":{\"isLive\":null,\"id\":\"ZPbtPKa4NkwPJpkcnKCQ13CnKifrWJ4D\",\"isTest\":null,\"errors\":null,\"playbackIds\":[{\"id\":\"01JBDzsmAT00MK6zf3pJ3RHunbYr6OisTA\",\"policy\":\"PUBLIC\"}],\"status\":\"ready\"}},{\"node\":{\"isLive\":null,\"id\":\"xt02yJBHNCzDqCCIO96UFENoMsFenmvrc\",\"isTest\":null,\"errors\":{\"type\":\"invalid_input\",\"messages\":[\"The input file \\\"https://www.dropbox.com/s/jis8hfb4zzylo2u/small.mp4?dl=0\\\" is not a valid JPEG or PNG image\"]},\"playbackIds\":[{\"id\":\"aUKYobA01LSUHMWhAk7mUTIY3aUQaLSXq\",\"policy\":\"PUBLIC\"}],\"status\":\"errored\"}},{\"node\":{\"isLive\":null,\"id\":\"1kEUxBdKJto75PZdc77SJDB6lggsE5QT\",\"isTest\":null,\"errors\":null,\"playbackIds\":[{\"id\":\"Vdl01utbL1C9uvr01Y3OjvRDwbeszXOB7S\",\"policy\":\"PUBLIC\"}],\"status\":\"ready\"}},{\"node\":{\"isLive\":null,\"id\":\"8btiBamnpp6hEK7OmmFCsJtWF2iQqV98\",\"isTest\":null,\"errors\":null,\"playbackIds\":[{\"id\":\"kV00neHvWNtRV602EJVwcHyiiwjpxx1QGr\",\"policy\":\"PUBLIC\"}],\"status\":\"ready\"}},{\"node\":{\"isLive\":null,\"id\":\"vaFRWQPbc700BAuFqcZNraqM67EVCYAUq\",\"isTest\":null,\"errors\":null,\"playbackIds\":[{\"id\":\"8WhQ1hxVdmW1NZWQ1WPgNOIq82HMAefh\",\"policy\":\"PUBLIC\"}],\"status\":\"ready\"}},{\"node\":{\"isLive\":null,\"id\":\"Hi022w28Pvt8w00LhfcTdc1o9P5uVS21Yu\",\"isTest\":null,\"errors\":null,\"playbackIds\":[{\"id\":\"Eg53ETydBsJoik01o7C6KePzFEqSDaWtJ\",\"policy\":\"PUBLIC\"}],\"status\":\"ready\"}},{\"node\":{\"isLive\":null,\"id\":\"RBAQoSVkzWyt99xQJ024Mb7oD5nfV8M8J\",\"isTest\":null,\"errors\":null,\"playbackIds\":[{\"id\":\"INM17YJmXd01775iJdl5EVw02utNfmlXUT\",\"policy\":\"PUBLIC\"}],\"status\":\"ready\"}},{\"node\":{\"isLive\":null,\"id\":\"GzT9twpXfdMuVY00LF1pZ4Ks02azWHlJbz\",\"isTest\":null,\"errors\":null,\"playbackIds\":[{\"id\":\"ZikeGe93ZkTyoBO9PMODENXGuiG00E5SZ\",\"policy\":\"PUBLIC\"}],\"status\":\"ready\"}},{\"node\":{\"isLive\":null,\"id\":\"800Ye9dH2qkB5EsKC5JrYNCP1C1Yuts9G\",\"isTest\":true,\"errors\":null,\"playbackIds\":[{\"id\":\"J02xulUbcH2lttXg0167A17MHmB7lPC00on\",\"policy\":\"PUBLIC\"}],\"status\":\"ready\"}},{\"node\":{\"isLive\":null,\"id\":\"eukuMTNGtz5B2VSElNjaUjJxc01QR5JY6\",\"isTest\":null,\"errors\":null,\"playbackIds\":[{\"id\":\"00v01UpKxNOaerZoCT9GE1hxvBbOvGi6Ky\",\"policy\":\"PUBLIC\"}],\"status\":\"ready\"}},{\"node\":{\"isLive\":null,\"id\":\"018xlclH1G01uuNFO4YiW1X5jY2iLxavWY\",\"isTest\":null,\"errors\":null,\"playbackIds\":[{\"id\":\"spTG8QHym1TE01G01QXI28I3jfbxIffPJq\",\"policy\":\"PUBLIC\"}],\"status\":\"ready\"}}]}}}}}"
---

```graphql
query MuxListAssetQuery(
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
      assets {
        edges {
          node {
            ...MuxVideoAssetFragment
          }
        }
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
