import { valueOrThrow } from '../util/value-or-throw'
import { get, set } from './api-cache'
import { apiClient } from './rick-and-morty.client'
import type { Location } from './rick-and-morty.model'
import { LocationResponse } from './rick-and-morty.types'

const toLocation = (response: LocationResponse): Location => {
  return {
    ...response,
  }
}

const toCacheKey = (id: string | number): string => `location:${id}`

export const getLocation = async (id: string | number): Promise<Location | Error> => {
  const cached = get<Location>(toCacheKey(id))
  if(cached) {
    return cached
  }

  try {
    const response = (await apiClient.get(`/location/${id}`)).data
    const validatedResponse = valueOrThrow(LocationResponse, response)
    const result = toLocation(validatedResponse)
    set(toCacheKey(id), result)
    return result
  } catch (e) {
    const error = e as Error
    return new Error(`Failed to fetch location with id "${id}": ${error.message}`)
  }
}
