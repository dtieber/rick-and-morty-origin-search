import { describe, expect, it } from '@jest/globals'
import { isRight, right } from 'fp-ts/Either'

import { CharacterResponse, EpisodeResponse, EpisodeSearchResponse, LocationResponse } from '../rick-and-morty.types'
import { sampleEpisodeResponse, sampleResponseForPotion } from './find-episodes-sample-response'
import { sampleCharacterResponse } from './get-character-sample-response'
import { sampleLocationResponse } from './get-location-sample-response'

describe('rick and morty types: EpisodeResponse', () => {
  it('validates an episode', () => {
    const episodeResponse = sampleEpisodeResponse

    const result = EpisodeResponse.decode(episodeResponse)

    expect(isRight(result)).toBe(true)
    expect(result).toEqual(right({
      name: 'Rick Potion #9',
      episode: 'S01E06',
      characters: [
        'https://rickandmortyapi.com/api/character/1',
        'https://rickandmortyapi.com/api/character/2',
      ],
    }))
  })

  it('rejects an invalid episode', () => {
    const episode = {}

    const parsed = EpisodeResponse.decode(episode.toString())

    expect(isRight(parsed)).toBe(false)
  })
})

describe('rick and morty types: EpisodeSearchResponse', () => {
  it('validates an episode', () => {
    const episodeSearchResponse = sampleResponseForPotion

    const result = EpisodeSearchResponse.decode(episodeSearchResponse)

    expect(isRight(result)).toBe(true)
    expect(result).toEqual(right({
      info: {
        count: 1,
        pages: 1,
      },
      results: [
        {
          name: 'Rick Potion #9',
          episode: 'S01E06',
          characters: [
            'https://rickandmortyapi.com/api/character/1',
            'https://rickandmortyapi.com/api/character/2',
          ],
        },
      ],
    }))
  })

  it('rejects an invalid episode', () => {
    const episode = {}

    const parsed = EpisodeResponse.decode(episode.toString())

    expect(isRight(parsed)).toBe(false)
  })
})

describe('rick and morty types: CharacterResponse', () => {
  it('validates a character', () => {
    const character = sampleCharacterResponse

    const result = CharacterResponse.decode(character)

    expect(isRight(result)).toBe(true)
    expect(result).toEqual(right({
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      origin: {
        name: 'Earth (C-137)',
        url: 'https://rickandmortyapi.com/api/location/1',
      },
    }))
  })

  it('rejects an invalid character', () => {
    const character = {}

    const parsed = CharacterResponse.decode(character.toString())

    expect(isRight(parsed)).toBe(false)
  })
})

describe('rick and morty types: LocationResponse', () => {
  it('validates a location', () => {
    const location = sampleLocationResponse

    const result = LocationResponse.decode(location)

    expect(isRight(result)).toBe(true)
    expect(result).toEqual(right({
      name: 'Earth (C-137)',
      type: 'Planet',
    }))
  })

  it('rejects an invalid location', () => {
    const location = {}

    const parsed = LocationResponse.decode(location.toString())

    expect(isRight(parsed)).toBe(false)
  })
})
