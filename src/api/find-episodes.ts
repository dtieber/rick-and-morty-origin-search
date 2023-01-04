import { rickAndMortyResourceLinkToId } from '../util/link-to-id.util'
import { valueOrThrow } from '../util/value-or-throw'
import { apiClient } from './rick-and-morty.client'
import type { Episode } from './rick-and-morty.model'
import type { EpisodeResponse } from './rick-and-morty.types'
import { EpisodeSearchResponse } from './rick-and-morty.types'

const toEpisode = (response: EpisodeResponse): Episode => {
  const characterIds = response.characters.map((link) => rickAndMortyResourceLinkToId(link)).filter(Boolean) as string[]
  return {
    name: response.name,
    episodeRef: response.episode,
    characterIds,
  }
}

export const findEpisodes = async (searchTerm: string): Promise<Episode[] | Error> => {
  try {
    const response = (await apiClient.get(`/episode?name=${searchTerm}`)).data
    const validatedResponse = valueOrThrow(EpisodeSearchResponse, response)
    if(validatedResponse.info.pages > 1) {
      return new Error(`Too many results (${validatedResponse.info.count}) for search-term "${searchTerm}". Please use another search term.`)
    }

    return validatedResponse.results.map(episodeResponse => toEpisode(episodeResponse))
  } catch (e) {
    const error = e as Error
    return new Error(`Failed to resolve episodes for search term "${searchTerm}": ${error.message}`)
  }
}
