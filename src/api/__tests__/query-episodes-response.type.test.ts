import { describe, expect, it } from '@jest/globals'
import { isRight, right } from 'fp-ts/Either'

import { QueryEpisodesResponse } from '../query-episodes-response.type'
import { sampleQueryEpisodesResponse } from './query-episodes-sample-response'

describe('query-episode-response type', () => {
  it('validates a response', () => {
    const response = sampleQueryEpisodesResponse

    const result = QueryEpisodesResponse.decode(response.data)

    expect(isRight(result)).toBe(true)
    expect(result).toEqual(right(sampleQueryEpisodesResponse.data))
  })

  it('rejects an invalid response', () => {
    const location = {}

    const parsed = QueryEpisodesResponse.decode(location.toString())

    expect(isRight(parsed)).toBe(false)
  })
})
