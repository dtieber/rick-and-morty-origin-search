import type { FastifyPluginAsync } from 'fastify'
import * as fp from 'fastify-plugin'

import { getOriginsFromCharactersFromEpisode } from '../services/get-origins.service'
import { isError } from '../util/is-error.util'
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

      const result = await getOriginsFromCharactersFromEpisode(request.log, queryString.q)
      if(isError(result)) {
        return reply.code(500).send(result)
      }

      const allOrigins = result.flatMap(episodes => episodes.characters).map(character => character.origin?.name).filter(Boolean) as string[]
      const uniqueOrigins = [
        ...new Set(allOrigins),
      ]
      return reply.code(200).send({
        hits: {
          meta: {
            total: uniqueOrigins.length,
          },
          origins: uniqueOrigins,
          details: result,
        },
      })
    },

  })
}

export const getOriginLocations = fp(routePlugin)
