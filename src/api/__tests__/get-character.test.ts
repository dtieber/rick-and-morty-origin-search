const apiMock = {
  get: jest.fn(),
}
jest.mock('../rick-and-morty.client', () => ({
  apiClient: apiMock,
}))

import { describe, expect, it, jest } from '@jest/globals'

import { getCharacter } from '../get-character'
import { sampleCharacterResponse, sampleCharacterResponseWithoutOrigin } from './get-character-sample-response'

describe('get-character', () => {
  it('returns a character and their origin location', async () => {
    apiMock.get.mockReturnValueOnce({ data: sampleCharacterResponse })

    const episodes = await getCharacter(1)

    expect(episodes).toEqual({
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      originRef: '1',
    })
  })

  it('returns a character without their origin location if unknown', async () => {
    apiMock.get.mockReturnValueOnce({ data: sampleCharacterResponseWithoutOrigin })

    const episodes = await getCharacter(116)

    expect(episodes).toEqual({
      name: 'Evil Beth Clone',
      status: 'Dead',
      species: 'Human',
    })
  })

  it('returns an error if call to downstream service fails', async () => {
    apiMock.get.mockImplementationOnce(() => {
      throw new Error('Something bad happened.')
    })

    const episodes = await getCharacter(9999)

    expect(episodes).toEqual(new Error('Failed to fetch character with id "9999": Something bad happened.'))
  })

  it('serves cached characters from cache', async () => {
    apiMock.get.mockReturnValueOnce({ data: sampleCharacterResponse })

    await getCharacter(1)
    const episodes = await getCharacter(1)

    expect(episodes).toEqual({
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      originRef: '1',
    })
  })
})
