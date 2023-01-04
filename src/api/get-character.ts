import { rickAndMortyResourceLinkToId } from '../util/link-to-id.util'
import { valueOrThrow } from '../util/value-or-throw'
import { get, set } from './api-cache'
import { apiClient } from './rick-and-morty.client'
import type { Character } from './rick-and-morty.model'
import { CharacterResponse } from './rick-and-morty.types'

const toCharacter = (response: CharacterResponse): Character => {
  const originRef = response.origin.url && rickAndMortyResourceLinkToId(response.origin.url)
  return {
    name: response.name,
    status: response.status,
    species: response.species,
    ...originRef ? { originRef } : {},
  }
}

const toCacheKey = (id: string | number): string => `character:${id}`

export const getCharacter = async (id: string | number): Promise<Character | Error> => {
  const cached = get<Character>(toCacheKey(id))
  if(cached) {
    return cached
  }

  try {
    const response = (await apiClient.get(`/character/${id}`)).data
    const validatedResponse = valueOrThrow(CharacterResponse, response)
    const result = toCharacter(validatedResponse)
    set(toCacheKey(id), result)
    return result
  } catch (e) {
    const error = e as Error
    return new Error(`Failed to fetch character with id "${id}": ${error.message}`)
  }
}
