const getOriginsFromCharactersFromEpisodeMock = jest.fn()
jest.mock('../../services/get-origins.service', () => ({
  getOriginsFromCharactersFromEpisode: getOriginsFromCharactersFromEpisodeMock,
}))

import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals'
import type { FastifyInstance } from 'fastify'
import Fastify from 'fastify'

import { getOriginLocations } from '../get-origin-locations.route'

describe('get-origins-route', () => {

  let application: FastifyInstance

  beforeAll(async() => {
    application = Fastify()
    await application.register(getOriginLocations)
  })

  afterAll(async() => {
    await application.close()
  })

  it('assembles 200 response if search term can be resolved', async () => {
    const originSearchResult = [
      {
        episodeName: 'Rick Potion #9',
        episodeRef: 'S01E06',
        characters: [
          {
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            origin: {
              name: 'Earth (C-137)',
              type: 'Planet',
            },
          },
          {
            name: 'Morty Smith',
            status: 'Alive',
            species: 'Human',
          },
          {
            name: 'Summer Smith',
            status: 'Alive',
            species: 'Human',
            origin: {
              name: 'Earth (Replacement Dimension)',
              type: 'Planet',
            },
          },
        ],
      },
    ]
    getOriginsFromCharactersFromEpisodeMock.mockReturnValueOnce(originSearchResult)

    const response = await application.inject({
      method: 'GET',
      url: '/search?q=potion',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(JSON.stringify({
      hits:{
        meta:{
          total:2,
        },
        origins:[
          'Earth (C-137)',
          'Earth (Replacement Dimension)',
        ],
        details:[
          {
            episodeRef:'S01E06',
            episodeName:'Rick Potion #9',
            characters:[
              {
                name:'Rick Sanchez',
                origin:{
                  name:'Earth (C-137)',
                  type:'Planet',
                },
              },
              {
                name:'Morty Smith',
              },
              {
                name:'Summer Smith',
                origin:{
                  name:'Earth (Replacement Dimension)',
                  type:'Planet',
                },
              },
            ],
          },
        ],
      },
    }))
  })

  it('assembles 500 response if resolving search term fails', async () => {
    getOriginsFromCharactersFromEpisodeMock.mockReturnValueOnce(new Error('Some error reason'))

    const response = await application.inject({
      method: 'GET',
      url: '/search?q=potion',
    })

    expect(response.statusCode).toEqual(500)
    expect(response.body).toEqual(JSON.stringify({
      message: 'Some error reason',
    }))
  })
})
