import { valueOrThrow } from '../util/value-or-throw'
import { createQuery } from './create-episodes-query'
import { gqlClient } from './gql-client'
import { QueryEpisodesResponse } from './query-episodes-response.type'

export const queryEpisodeDetails = async (searchTerm: string): Promise<QueryEpisodesResponse | Error> => {
  try {
    const query = { query: createQuery(searchTerm) }
    const result = await gqlClient.query(query)
    return valueOrThrow(QueryEpisodesResponse, result.data)
  } catch (e) {
    const error = e as Error
    return new Error(`Failed to query episode details: ${error.message}`)
  }
}
