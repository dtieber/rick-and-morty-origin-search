import { describe, expect, it } from '@jest/globals'
import * as t from 'io-ts'

import { valueOrThrow } from '../value-or-throw'

describe('value-or-throw util', () => {
  it('returns value if input can be decoded successfully', () => {
    const input = 'foo bar'

    const result = valueOrThrow(t.string, input)

    expect(result).toEqual(input)
  })

  it('throws error if input cannot be decoded successfully', () => {
    const input = 'foo bar'

    expect(() => valueOrThrow(t.number, input)).toThrowError(/^Invalid value/)
  })
})
