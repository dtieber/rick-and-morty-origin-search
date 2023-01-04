import { describe, expect, it } from '@jest/globals'

import { isError } from '../is-error.util'

describe('isError type guard', () => {
  it('detects error', () => {
    expect(isError(new Error('so bad'))).toBe(true)
  })

  it('detects objects that look like errors because of duck typing', () => {
    const objectWithRequiredPropsOnError = {
      name: 'my error',
      message: 'so bad',
    }

    expect(isError(objectWithRequiredPropsOnError)).toBe(true)
  })

  it('detects non-errors', () => {
    const nonError = {
      id: 1,
      foo: 'bar',
    }

    expect(isError(nonError)).toBe(false)
  })
})
