import type { FastifyPluginAsync } from 'fastify'
import * as fp from 'fastify-plugin'

import { requestSchema, responseSchema } from './get-origin-locations.schema'

const routePlugin: FastifyPluginAsync = async (fastify, _) => {
  fastify.route({
    method: 'GET',
    url: '/search',
    schema: {
      ...requestSchema,
      ...responseSchema,
    },
    handler: async (request, reply): Promise<void> => {
      const queryString = request.query as { q: string }
      request.log.info({
        msg: `Received request to resolve episode name: ${queryString.q}`,
        queryString,
      })

      await reply.code(200).send({
        hits: {
          meta: {
            total: 1,
          },
          origins: [
            'Earth (C-137)',
          ],
          details: [
            {
              episodeRef: 'S04E06',
              episodeName: 'Never Ricking Morty',
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
              ],
            },
          ],
        },
      })
    },

  })
}

export const getOriginLocations = fp(routePlugin)
