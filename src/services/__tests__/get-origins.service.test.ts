const findEpisodesMock = jest.fn()
jest.mock('../../api/find-episodes', () => ({
  findEpisodes: findEpisodesMock,
}))

const getCharacterMock = jest.fn()
jest.mock('../../api/get-character', () => ({
  getCharacter: getCharacterMock,
}))

const getLocationMock = jest.fn()
jest.mock('../../api/get-location', () => ({
  getLocation: getLocationMock,
}))

import { describe, expect, it, jest } from '@jest/globals'
import pino from 'pino'

import { getOriginsFromCharactersFromEpisode } from '../get-origins.service'

describe('get-origins service', () => {
  const logger = pino({})

  it('returns a list of episodes, starring characters and their locations', async () => {
    findEpisodesMock.mockReturnValueOnce([
      {
        name: 'Rick Potion #9',
        episodeRef: 'S01E06',
        characterIds: [
          '1',
          '2',
          '3',
        ],
      },
    ])
    getCharacterMock
      .mockReturnValueOnce({
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        originRef: '1',
      })
      .mockReturnValueOnce({
        name: 'Morty Smith',
        status: 'Alive',
        species: 'Human',
      })
      .mockReturnValueOnce({
        name: 'Summer Smith',
        status: 'Alive',
        species: 'Human',
        originRef: '20',
      })
    getLocationMock
      .mockReturnValueOnce({
        name: 'Earth (C-137)',
        type: 'Planet',
      })
      .mockReturnValueOnce({
        name: 'Earth (Replacement Dimension)',
        type: 'Planet',
      })

    const result = await getOriginsFromCharactersFromEpisode(logger, 'my-search-term')

    expect(result).toEqual([
      {
        episodeName: 'Rick Potion #9',
        episodeRef: 'S01E06',
        characters: expect.arrayContaining([
          {
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            origin: {
              name: 'Earth (C-137)',
              type: 'Planet',
            },
          },
          {
            name: 'Morty Smith',
            status: 'Alive',
            species: 'Human',
          },
          {
            name: 'Summer Smith',
            status: 'Alive',
            species: 'Human',
            origin: {
              name: 'Earth (Replacement Dimension)',
              type: 'Planet',
            },
          },
        ]),
      },
    ])
  })

  it('short circuits if episodes cannot be retrieved', async () => {
    findEpisodesMock.mockReturnValueOnce(new Error())

    const result = await getOriginsFromCharactersFromEpisode(logger, 'my-search-term')

    expect(result).toBeInstanceOf(Error)
  })

  it('short circuits if an artist of an episode cannot be retrieved', async () => {
    findEpisodesMock.mockReturnValueOnce([
      {
        name: 'Rick Potion #9',
        episodeRef: 'S01E06',
        characterIds: [
          '1',
          '2',
        ],
      },
    ])
    getCharacterMock
      .mockReturnValueOnce({
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        originRef: '1',
      })
      .mockReturnValueOnce(new Error())

    const result = await getOriginsFromCharactersFromEpisode(logger, 'my-search-term')

    expect(result).toBeInstanceOf(Error)
  })

  it('short circuits if a location of an artist of an episode cannot be retrieved', async () => {
    findEpisodesMock.mockReturnValueOnce([
      {
        name: 'Rick Potion #9',
        episodeRef: 'S01E06',
        characterIds: [
          '1',
          '2',
        ],
      },
    ])
    getCharacterMock
      .mockReturnValueOnce({
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        originRef: '1',
      })
      .mockReturnValueOnce({
        name: 'Summer Smith',
        status: 'Alive',
        species: 'Human',
        originRef: '20',
      })
    getLocationMock
      .mockReturnValueOnce({
        name: 'Earth (C-137)',
        type: 'Planet',
      })
      .mockReturnValueOnce(new Error())

    const result = await getOriginsFromCharactersFromEpisode(logger, 'my-search-term')

    expect(result).toBeInstanceOf(Error)
  })
})
