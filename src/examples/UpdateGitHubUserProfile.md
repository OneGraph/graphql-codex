---
description: |
  Updates the currently authenticated GitHub user's profile. To run this, you'll need to either use a personal access token, or you'll need to make a custom GitHub app that requests the `user` permission. 
  
  Once you've made a custom GitHub app, set the client id/secret for it in your OneGraph dashboard, authenticate a user, and run this mutation!
contributedBy: "@sgrove"
variables: "{\"bio\":\"Cofounder at OneGraph\",\"name\":\"Sean Grove\",\"twitterUsername\":\"sgrove\"}"
title: "UpdateGitHubUserProfile"
result: |
  "{\"data\":{\"gitHub\":{\"updateAuthenticatedUser_oneGraph\":{\"updatedUser\":{\"bio\":\"Cofounder at OneGraph.com\",\"email\":\"sean@bushi.do\"}}}}}"
---

```graphql
mutation UpdateGitHubUserProfile(
  $hireable: Boolean
  $name: String
  $twitterUsername: String
  $bio: String
) {
  gitHub {
    # Note that you'll need a custom GitHub app
    # with the `user` permission requested in
    # order to update a user's profile
    updateAuthenticatedUser_oneGraph(
      input: {
        bio: $bio
        hireable: $hireable
        name: $name
        twitterUsername: $twitterUsername
      }
    ) {
      updatedUser {
        bio
        email
      }
    }
  }
}

```
