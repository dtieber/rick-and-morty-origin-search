import { sampleQueryEpisodesResponse } from './query-episodes-sample-response'

const gqlClientMock = {
  query: jest.fn(),
}
jest.mock('../gql-client', () => ({
  gqlClient: gqlClientMock,
}))

import { describe, expect, it, jest } from '@jest/globals'

import { queryEpisodeDetails } from '../query-episodes'

describe('query-episodes', () => {
  it('returns all episodes with details', async () => {
    gqlClientMock.query.mockReturnValueOnce(sampleQueryEpisodesResponse)

    const result = await queryEpisodeDetails('potion')

    expect(result).toEqual(sampleQueryEpisodesResponse.data)
  })

  it('returns an error if search-term does not yield any results', async () => {
    gqlClientMock.query.mockReturnValueOnce({
      data: {
        episodes: {
          info: {
            count: null,
          },
          results: [
          ],
        },
      },
    })

    const result = await queryEpisodeDetails('potqweqweqweeqwweqweewqqweion')

    expect(result).toBeInstanceOf(Error)
  })

  it('returns an error if sending query fails', async () => {
    gqlClientMock.query.mockImplementationOnce(() => new Error())

    const result = await queryEpisodeDetails('potion')

    expect(result).toBeInstanceOf(Error)
  })

  it('returns an error if unexpected response is returned', async () => {
    gqlClientMock.query.mockReturnValueOnce({ data: { foo: 'bar' } })

    const result = await queryEpisodeDetails('potion')

    expect(result).toBeInstanceOf(Error)
  })
})
