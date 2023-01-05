export type Origin = {
  name: string
  type: string
}

export type CharacterWithDetails = {
  name: string
  status: string
  species: string
  origin?: Origin
}

export type EpisodeWithCharacterAndOriginDetails = {
  episodeRef: string
  episodeName: string
  characters: CharacterWithDetails[]
}
