import type { DocumentNode } from '@apollo/client/core'
import { gql } from '@apollo/client/core'

export const createQuery = (searchTerm: string): DocumentNode => gql `
  query {
    episodes(filter: {name: "${searchTerm}"}) {
      info {
        count
      }
      results {
        name
        episodeRef: episode
        characters {
          name
          status
          species
          origin {
            name
            type
          }
        }
      }
    }
  }
`
