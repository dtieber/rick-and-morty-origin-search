import { valueOrThrow } from '../util/value-or-throw'
import { createQuery } from './create-episodes-query'
import { gqlClient } from './gql-client'
import { QueryEpisodesResponse } from './query-episodes-response.type'

export const queryEpisodeDetails = async (searchTerm: string): Promise<QueryEpisodesResponse | Error> => {
  try {
    const query = { query: createQuery(searchTerm) }
    const result = await gqlClient.query(query)
    const validatedResult = valueOrThrow(QueryEpisodesResponse, result.data)
    if(validatedResult.episodes.info.count === null) {
      return new Error(`Search-term: "${searchTerm}" did not yield any results.`)
    }
    return validatedResult
  } catch (e) {
    const error = e as Error
    return new Error(`Failed to query episode details: ${error.message}`)
  }
}
