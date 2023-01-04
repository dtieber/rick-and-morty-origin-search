import type { FastifyBaseLogger } from 'fastify'

import { findEpisodes } from '../api/find-episodes'
import { getCharacter } from '../api/get-character'
import { getLocation } from '../api/get-location'
import type { Character, Episode } from '../api/rick-and-morty.model'
import { ConsolidatedError } from '../error/consolidated-error'
import { isError } from '../util/is-error.util'
import type {
  CharacterExtendedByLocationDetails,
  CharacterWithOriginRef,
  EpisodeExtendedByCharacterDetails,
} from './get-origins.model'
import type { EpisodeWithCharacterAndOriginDetails } from './get-origins.model'

const extendByCharacterDetails = async (episode: Episode): Promise<EpisodeExtendedByCharacterDetails | Error> => {
  const getCharacterResult = await Promise.all(episode.characterIds.map(ref => getCharacter(ref)))
  const getCharacterErrors = getCharacterResult.filter((result) => isError(result)) as Error[]
  if(getCharacterErrors.length) {
    return new ConsolidatedError(`Failed to retrieve all character details for Episode ${episode.episodeRef}`, getCharacterErrors)
  }

  return {
    episodeName: episode.name,
    episodeRef: episode.episodeRef,
    characters: getCharacterResult as Character[],
  }
}

const extendCharacterByLocationDetails = async (character: CharacterWithOriginRef): Promise<CharacterExtendedByLocationDetails | Error> => {
  const locationResult = await getLocation(character.originRef)
  if(isError(locationResult)) {
    return locationResult
  }

  return {
    name: character.name,
    status: character.status,
    species: character.species,
    origin: {
      name: locationResult.name,
      type: locationResult.type,
    },
  }
}

const extendByLocationDetails = async (episode: EpisodeExtendedByCharacterDetails): Promise<EpisodeWithCharacterAndOriginDetails | Error> => {
  const characters = episode.characters

  const charactersWithoutOrigin = characters.filter((character) => !character.originRef) as unknown as CharacterWithOriginRef[]
  const charactersWithOrigin = characters.filter((character) => character.originRef) as unknown as CharacterWithOriginRef[]

  const charactersWithResolvedOrigins = await Promise.all(charactersWithOrigin.map((character) => extendCharacterByLocationDetails(character)))
  const charactersWithResolvedOriginsErrors = charactersWithResolvedOrigins.filter((characterWithOriginResult) => isError(characterWithOriginResult)) as Error[]
  if(charactersWithResolvedOriginsErrors.length) {
    return new ConsolidatedError('Failed to resolve all origins', charactersWithResolvedOriginsErrors)
  }

  return {
    episodeName: episode.episodeName,
    episodeRef: episode.episodeRef,
    characters: [
      ...charactersWithoutOrigin,
      ...charactersWithResolvedOrigins as CharacterExtendedByLocationDetails[],
    ],
  }
}

export const getOriginsFromCharactersFromEpisode = async(logger: FastifyBaseLogger, episodeSearchTerm: string): Promise<EpisodeWithCharacterAndOriginDetails[] | Error> => {
  const findEpisodesResult = await findEpisodes(episodeSearchTerm)
  if(isError(findEpisodesResult)) {
    logger.info({ message: `Failed to resolve episodes by search-term "${episodeSearchTerm}": ${findEpisodesResult.message}` })
    return findEpisodesResult
  }
  logger.info({
    message: `Found ${findEpisodesResult.length} episode(s)`,
  })

  const episodesWithCharacters = await Promise.all(findEpisodesResult.map(episode => extendByCharacterDetails(episode)))
  const extendByCharacterErrors = episodesWithCharacters.filter(episode => isError(episode)) as Error[]
  if(extendByCharacterErrors.length) {
    const consolidatedError = new ConsolidatedError('Failed to extend episodes by character details', extendByCharacterErrors)
    logger.info({
      message: 'Failed to resolve all characters from all episodes',
      errors: extendByCharacterErrors,
    })
    return consolidatedError
  }
  logger.info('Successfully extended characters')

  const filteredEpisodeWithCharacters = episodesWithCharacters as unknown as EpisodeExtendedByCharacterDetails[]
  const fullyResolvedEpisodeDetails = await Promise.all(filteredEpisodeWithCharacters.map(episode => extendByLocationDetails(episode)))
  const fullyResolvedEpisodeDetailsErrors = fullyResolvedEpisodeDetails.filter(episode => isError(episode)) as Error[]
  if(fullyResolvedEpisodeDetailsErrors.length) {
    const consolidatedError = new ConsolidatedError('Failed to extend all origins', fullyResolvedEpisodeDetailsErrors)
    logger.info({
      message: 'Failed to resolve all locations from all characters from all episodes',
      consolidatedError,
    })
    return consolidatedError
  }
  logger.info('Successfully extended origins from characters')

  logger.info({
    message: 'Fully resolved all locations',
    episodes: fullyResolvedEpisodeDetails,
  })
  return fullyResolvedEpisodeDetails as unknown as EpisodeWithCharacterAndOriginDetails[]
}
