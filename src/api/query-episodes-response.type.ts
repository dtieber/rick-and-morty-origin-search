import * as t from 'io-ts'

const QueryEpisodesResponseInfo = t.exact(t.type({
  count: t.number,
}))
export type QueryEpisodesResponseInfo = t.TypeOf<typeof QueryEpisodesResponseInfo>

const QueryEpisodesResponseLocation = t.exact(t.type({
  name: t.string,
  type: t.union([
    t.string,
    t.null,
  ]),
}))
export type QueryEpisodesResponseLocation = t.TypeOf<typeof QueryEpisodesResponseLocation>

const QueryEpisodesResponseCharacter = t.exact(t.type({
  name: t.string,
  status: t.string,
  species: t.string,
  origin: QueryEpisodesResponseLocation,
}))
export type QueryEpisodesResponseCharacter = t.TypeOf<typeof QueryEpisodesResponseCharacter>

const QueryEpisodesResponseResult = t.exact(t.type({
  name: t.string,
  episodeRef: t.string,
  characters: t.array(QueryEpisodesResponseCharacter),
}))
export type QueryEpisodesResponseResult = t.TypeOf<typeof QueryEpisodesResponseResult>

export const QueryEpisodesResponse = t.exact(t.type({
  episodes: t.exact(t.type({
    info: QueryEpisodesResponseInfo,
    results: t.array(QueryEpisodesResponseResult),
  })),
}))
export type QueryEpisodesResponse = t.TypeOf<typeof QueryEpisodesResponse>
