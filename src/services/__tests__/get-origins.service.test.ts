import { sampleQueryEpisodesResponse } from '../../api/__tests__/query-episodes-sample-response'

const queryEpisodeDetailsMock = jest.fn()
jest.mock('../../api/query-episodes', () => ({
  queryEpisodeDetails: queryEpisodeDetailsMock,
}))

import { describe, expect, it, jest } from '@jest/globals'
import pino from 'pino'

import { getOriginsFromCharactersFromEpisode } from '../get-origins.service'

describe('get-origins service', () => {
  const logger = pino({})

  it('returns a list of episodes, starring characters and their locations', async () => {
    queryEpisodeDetailsMock.mockReturnValueOnce(sampleQueryEpisodesResponse.data)

    const result = await getOriginsFromCharactersFromEpisode(logger, 'my-search-term')

    expect(result).toEqual([
      {
        episodeName: 'Rick Potion #9',
        episodeRef: 'S01E06',
        characters: [
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
          {
            name: 'Beth Smith',
            status: 'Alive',
            species: 'Human',
            origin: {
              name: 'Earth (Replacement Dimension)',
              type: 'Planet',
            },
          },
          {
            name: 'Jerry Smith',
            status: 'Alive',
            species: 'Human',
            origin: {
              name: 'Earth (Replacement Dimension)',
              type: 'Planet',
            },
          },
          {
            name: 'Beth Smith',
            status: 'Alive',
            species: 'Human',
            origin: {
              name: 'Earth (C-137)',
              type: 'Planet',
            },
          },
          {
            name: 'Brad',
            status: 'Alive',
            species: 'Human',
            origin: {
              name: 'Earth (Replacement Dimension)',
              type: 'Planet',
            },
          },
          {
            name: 'Cronenberg Rick',
            status: 'unknown',
            species: 'Cronenberg',
            origin: {
              name: 'Cronenberg Earth',
              type: 'Planet',
            },
          },
          {
            name: 'Cronenberg Morty',
            status: 'unknown',
            species: 'Cronenberg',
            origin: {
              name: 'Cronenberg Earth',
              type: 'Planet',
            },
          },
          {
            name: 'Davin',
            status: 'Dead',
            species: 'Human',
            origin: {
              name: 'Earth (C-137)',
              type: 'Planet',
            },
          },
          {
            name: 'Harold',
            status: 'Alive',
            species: 'Cronenberg',
            origin: {
              name: 'Earth (C-137)',
              type: 'Planet',
            },
          },
          {
            name: 'Jerry Smith',
            status: 'Alive',
            species: 'Human',
            origin: {
              name: 'Earth (C-137)',
              type: 'Planet',
            },
          },
          {
            name: 'Jessica',
            status: 'Alive',
            species: 'Cronenberg',
            origin: {
              name: 'Earth (C-137)',
              type: 'Planet',
            },
          },
          {
            name: 'Jessica\'s Friend',
            status: 'Alive',
            species: 'Human',
            origin: {
              name: 'Earth (C-137)',
              type: 'Planet',
            },
          },
          {
            name: 'MC Haps',
            status: 'Alive',
            species: 'Human',
            origin: {
              name: 'Earth (C-137)',
              type: 'Planet',
            },
          },
          {
            name: 'Morty Smith',
            status: 'Dead',
            species: 'Human',
            origin: {
              name: 'Earth (Replacement Dimension)',
              type: 'Planet',
            },
          },
          {
            name: 'Mr. Goldenfold',
            status: 'Alive',
            species: 'Cronenberg',
            origin: {
              name: 'Earth (C-137)',
              type: 'Planet',
            },
          },
          {
            name: 'Mrs. Sanchez',
            status: 'unknown',
            species: 'Human',
          },
          {
            name: 'Nancy',
            status: 'Alive',
            species: 'Human',
            origin: {
              name: 'Earth (Replacement Dimension)',
              type: 'Planet',
            },
          },
          {
            name: 'Principal Vagina',
            status: 'Alive',
            species: 'Cronenberg',
            origin: {
              name: 'Earth (C-137)',
              type: 'Planet',
            },
          },
          {
            name: 'Rick Sanchez',
            status: 'Dead',
            species: 'Human',
            origin: {
              name: 'Earth (Replacement Dimension)',
              type: 'Planet',
            },
          },
          {
            name: 'Summer Smith',
            status: 'Alive',
            species: 'Human',
            origin: {
              name: 'Earth (C-137)',
              type: 'Planet',
            },
          },
          {
            name: 'Tammy Guetermann',
            status: 'Alive',
            species: 'Cronenberg',
            origin: {
              name: 'Earth (C-137)',
              type: 'Planet',
            },
          },
          {
            name: 'Davin',
            status: 'Dead',
            species: 'Cronenberg',
            origin: {
              name: 'Earth (C-137)',
              type: 'Planet',
            },
          },
        ],
      },
    ])
  })

  it('returns an error if querying episode details fails', async () => {
    queryEpisodeDetailsMock.mockReturnValueOnce(new Error())

    const result = await getOriginsFromCharactersFromEpisode(logger, 'my-search-term')

    expect(result).toBeInstanceOf(Error)
  })
})
