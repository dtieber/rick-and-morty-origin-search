import { describe, expect, it } from '@jest/globals'

import { rickAndMortyResourceLinkToId } from '../link-to-id.util'

describe('link-to-id util', () => {
  it('extracts an id from a rick and morty link reference', () => {
    const parsedId = rickAndMortyResourceLinkToId('https://rickandmortyapi.com/api/character/1')

    expect(parsedId).toEqual('1')
  })

  it('returns undefined if a link from a different api is provided', () => {
    const parsedId = rickAndMortyResourceLinkToId('https://cataas.com/cat/123')

    expect(parsedId).toBeUndefined()
  })

  it('returns undefined if a non-resource link is provided', () => {
    const parsedId = rickAndMortyResourceLinkToId('https://rickandmortyapi.com/api/episode/?page=2&name=rick')

    expect(parsedId).toBeUndefined()
  })
})
