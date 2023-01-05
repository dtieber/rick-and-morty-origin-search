import type { FastifyBaseLogger } from 'fastify'

import { queryEpisodeDetails } from '../api/query-episodes'
import type {
  QueryEpisodesResponse,
  QueryEpisodesResponseLocation,
  QueryEpisodesResponseResult,
} from '../api/query-episodes-response.type'
import type { QueryEpisodesResponseCharacter } from '../api/query-episodes-response.type'
import { isError } from '../util/is-error.util'
import type { EpisodeWithCharacterAndOriginDetails } from './get-origins.model'
import type { Origin } from './get-origins.model'
import type { CharacterWithDetails } from './get-origins.model'

const mapOriginResult = (originResult: QueryEpisodesResponseLocation): Origin | undefined => {
  if(originResult.name === 'unknown' || originResult.type === null) {
    return undefined
  }
  const { name, type } = originResult
  return {
    name,
    type,
  }
}

const mapCharacterResult = (characterResult: QueryEpisodesResponseCharacter): CharacterWithDetails => {
  const { name, status, species } = characterResult
  const origin = mapOriginResult(characterResult.origin)
  return {
    name,
    status,
    species,
    origin,
  }
}

const mapEpisodeResult = (episodeResult: QueryEpisodesResponseResult): EpisodeWithCharacterAndOriginDetails => {
  const characters = episodeResult.characters.map(characterResult => mapCharacterResult(characterResult))
  return {
    episodeName: episodeResult.name,
    episodeRef: episodeResult.episodeRef,
    characters,
  }
}

const removeNullsAndUnknowns = (episodeDetails: QueryEpisodesResponse): EpisodeWithCharacterAndOriginDetails[] => {
  const episodesResult = episodeDetails.episodes.results
  return episodesResult.map(episodeResult => mapEpisodeResult(episodeResult))
}

export const getOriginsFromCharactersFromEpisode = async(logger: FastifyBaseLogger, episodeSearchTerm: string): Promise<EpisodeWithCharacterAndOriginDetails[] | Error> => {
  const episodeDetailResponse = await queryEpisodeDetails(episodeSearchTerm)
  if(isError(episodeDetailResponse)) {
    logger.info({ message: `Failed to resolve episodes by search-term "${episodeSearchTerm}": ${episodeDetailResponse.message}` })
    return episodeDetailResponse
  }

  const mappedEpisodeDetails = removeNullsAndUnknowns(episodeDetailResponse)
  logger.info({
    message: 'Successfully fetched all episodes',
    episodes: mappedEpisodeDetails,
  })
  return mappedEpisodeDetails
}
