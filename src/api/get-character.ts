import { rickAndMortyResourceLinkToId } from '../util/link-to-id.util'
import { valueOrThrow } from '../util/value-or-throw'
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

export const getCharacter = async (id: string | number): Promise<Character | Error> => {
  try {
    const response = (await apiClient.get(`/character/${id}`)).data
    const validatedResponse = valueOrThrow(CharacterResponse, response)
    return toCharacter(validatedResponse)
  } catch (e) {
    const error = e as Error
    return new Error(`Failed to fetch character with id "${id}": ${error.message}`)
  }
}
