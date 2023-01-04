import { sampleResponseForPotion, sampleResponseWithMultiplePages } from './find-episodes-sample-response'

const apiMock = {
  get: jest.fn(),
}
jest.mock('../rick-and-morty.client', () => ({
  apiClient: apiMock,
}))

import { describe, expect, it, jest } from '@jest/globals'

import { findEpisodes } from '../find-episodes'

describe('find-episodes', () => {
  it('returns a list of a episodes for a given search term', async () => {
    const searchTerm = 'potion'
    apiMock.get.mockReturnValueOnce({ data: sampleResponseForPotion })

    const episodes = await findEpisodes(searchTerm)

    expect(episodes).toEqual([
      {
        name: 'Rick Potion #9',
        episodeRef: 'S01E06',
        characterIds: [
          '1',
          '2',
        ],
      },
    ])
  })

  it('returns an error if there are too many results for a given term', async () => {
    const searchTerm = 'rick'
    apiMock.get.mockReturnValueOnce({ data: sampleResponseWithMultiplePages })

    const episodes = await findEpisodes(searchTerm)

    expect(episodes).toEqual(new Error('Too many results (28) for search-term "rick". Please use another search term.'))
  })

  it('returns an error if call to downstream service fails', async () => {
    const searchTerm = 'rick'
    apiMock.get.mockImplementationOnce(() => {
      throw new Error('Something bad happened.')
    })

    const episodes = await findEpisodes(searchTerm)

    expect(episodes).toEqual(new Error('Failed to resolve episodes for search term "rick": Something bad happened.'))
  })

  it('serves cached results from cache', async () => {
    const searchTerm = 'potion'
    apiMock.get.mockReturnValueOnce({ data: sampleResponseForPotion })

    await findEpisodes(searchTerm)
    const episodes = await findEpisodes(searchTerm)

    expect(episodes).toEqual([
      {
        name: 'Rick Potion #9',
        episodeRef: 'S01E06',
        characterIds: [
          '1',
          '2',
        ],
      },
    ])
  })
})
