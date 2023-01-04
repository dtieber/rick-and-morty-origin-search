import * as t from 'io-ts'

export const EpisodeResponse = t.exact(t.type({
  name: t.string,
  episode: t.string,
  characters: t.array(t.string),
}))
export type EpisodeResponse = t.TypeOf<typeof EpisodeResponse>

const ResponseInfo = t.exact(t.type({
  count: t.number,
  pages: t.number,
}))

export const EpisodeSearchResponse = t.type({
  info: ResponseInfo,
  results: t.array(EpisodeResponse),
})
export type EpisodeSearchResponse = t.TypeOf<typeof EpisodeSearchResponse>

const OriginRef = t.type({
  name: t.string,
  url: t.string,
})
export const CharacterResponse = t.exact(t.type({
  name: t.string,
  status: t.string,
  species: t.string,
  origin: OriginRef,
}))
export type CharacterResponse = t.TypeOf<typeof CharacterResponse>
