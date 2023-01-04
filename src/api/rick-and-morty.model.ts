export type Episode = {
  name: string
  episodeRef: string
  characterIds: string[]
}

export type Character = {
  name: string
  status: string
  species: string
  originRef?: string
}

export type Location = {
  name: string
  type: string
}
