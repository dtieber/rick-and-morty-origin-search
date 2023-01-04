const apiMock = {
  get: jest.fn(),
}
jest.mock('../rick-and-morty.client', () => ({
  apiClient: apiMock,
}))

import { describe, expect, it, jest } from '@jest/globals'

import { getLocation } from '../get-location'
import { sampleLocationResponse } from './get-location-sample-response'

describe('get-location', () => {
  it('returns a location', async () => {
    apiMock.get.mockReturnValueOnce({ data: sampleLocationResponse })

    const episodes = await getLocation(1)

    expect(episodes).toEqual({
      name: 'Earth (C-137)',
      type: 'Planet',
    })
  })

  it('returns an error if call to downstream service fails', async () => {
    apiMock.get.mockImplementationOnce(() => {
      throw new Error('Something bad happened.')
    })

    const episodes = await getLocation(9999)

    expect(episodes).toEqual(new Error('Failed to fetch location with id "9999": Something bad happened.'))
  })
})
