
---
description: |
  Clearbit is a super interesting service, check it out!
---

```graphql
query EnrichEmailWithClearbi($email: String!) {
  clearbit {
    enrich(email: $email) {
      person {
        bio
        avatar
        employment {
          role
          name
          domain
          seniority
          title
        }
        facebook {
          handle
        }
        gravatar {
          handle
          urls
          avatar
          avatars {
            url
            type
          }
        }
        linkedin {
          handle
        }
        location
        name {
          familyName
          fullName
          givenName
        }
      }
    }
  }
}

```
