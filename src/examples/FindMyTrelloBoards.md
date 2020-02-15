---
description: |
  Given a username, find the name of all the Trello boards
contributedBy: "@sgrove"
variables: "{}"
title: "FindMyTrelloBoards"
result: |
  "{\"data\":{\"trello\":{\"member\":{\"boards\":{\"nodes\":[{\"name\":\"Armory Spend Bot\"},{\"name\":\"Code Demo\"},{\"name\":\"Company\"},{\"name\":\"Launch HN\"},{\"name\":\"OneGraph Service\"},{\"name\":\"Stripe\"},{\"name\":\"Welcome Board\"},{\"name\":\"YouTube\"}]}}},\"me\":{\"trello\":{\"email\":\"sean@onegraph.com\",\"gravatarHash\":\"1aeab39912a06875d4cd5b11b822361f\",\"username\":\"seangrove4\"}}}}"
---

```graphql
query FindMyTrelloBoards {
  trello {
    member(username: "seangrove4") {
      boards {
        nodes {
          name
        }
      }
    }
  }
  me {
    trello {
      email
      gravatarHash
      username
    }
  }
}

```
