---
description: |
  Reads from a specific range of cells in a Google sheets
contributedBy: "@sgrove"
variables: ""
title: "SpecificRangeInGoogleSheets"
result: |
  null
---

```graphql
query SpecificRangeInGoogleSheets(
  # The id of the sheet to pull data from, in
  # https://docs.google.com/spreadsheets/d/1CRUduucIQKot-Bwvh4teSblQTWPsIoNUs6AGLAg7Sjs/edit
  # it would be "1CRUduucIQKot-Bwvh4teSblQTWPsIoNUs6AGLAg7Sjs"
  $id: String!
  # Normal syntax for selecting ranges in sheets
  $ranges: String = "e12:f16"
) {
  google {
    sheets {
      sheet(
        id: $id
        ranges: $ranges
        includeGridData: true
      ) {
        sheets {
          data {
            rowData {
              values {
                formattedValue
              }
            }
          }
        }
      }
    }
  }
}

```
