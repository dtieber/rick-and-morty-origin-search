import { describe, expect, it } from '@jest/globals'

import { get, set } from '../api-cache'

describe('api-cache', () => {
  it('returnes stored items', () => {
    set('cache-key', 'cache-value')

    const fromCache = get('cache-key')

    expect(fromCache).toBe('cache-value')
  })

  it('returns undefined if key is unknown', () => {
    const keyDoesNotExistInCache = get('does-not-exist')

    expect(keyDoesNotExistInCache).toBeUndefined()
  })
})
