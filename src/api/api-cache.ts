import * as LRU from 'lru-cache'

const cache = new LRU({
  ttl: 1000 * 60 * 5,
  ttlAutopurge: true,
})

export const get = <T>(key: string): T | undefined => {
  return cache.get<T>(key)
}

export const set = <T>(key: string, value: T): void => {
  cache.set(key, value)
}
