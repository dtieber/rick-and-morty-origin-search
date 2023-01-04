import type { Character } from '../api/rick-and-morty.model'

export type EpisodeWithCharacterAndOriginDetails = {
  episodeRef: string
  episodeName: string
  characters: {
    name: string
    status: string
    species: string
    origin?: {
      name: string
      type: string
    }
  }[]
}

export type CharacterWithOriginRef = Pick<Character, 'name' | 'status'| 'species'> & {
  originRef: string
}

export type CharacterExtendedByLocationDetails = {
  name: string
  status: string
  species: string
  origin: {
    name: string,
    type: string
  }
}

export type EpisodeExtendedByCharacterDetails = Pick<EpisodeWithCharacterAndOriginDetails, 'episodeRef' | 'episodeName'> & {
  characters: Character[]
}
