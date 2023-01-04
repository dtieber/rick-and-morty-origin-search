import { valueOrThrow } from '../util/value-or-throw'
import { apiClient } from './rick-and-morty.client'
import type { Location } from './rick-and-morty.model'
import { LocationResponse } from './rick-and-morty.types'

const toLocation = (response: LocationResponse): Location => {
  return {
    ...response,
  }
}

export const getLocation = async (id: string | number): Promise<Location | Error> => {
  try {
    const response = (await apiClient.get(`/location/${id}`)).data
    const validatedResponse = valueOrThrow(LocationResponse, response)
    return toLocation(validatedResponse)
  } catch (e) {
    const error = e as Error
    return new Error(`Failed to fetch location with id "${id}": ${error.message}`)
  }
}
