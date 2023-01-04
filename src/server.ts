import * as fastifySwagger from '@fastify/swagger'
import type { FastifyInstance } from 'fastify'
import Fastify from 'fastify'

import { config } from './config'
import { loggerConfig } from './logger/logging.configuration'
import { swaggerConfiguration } from './oas/configuration'
import { getOriginLocations } from './routes/get-origin-locations.route'

const fastifyConfig = {
  logger: loggerConfig,
}

export const startServer = async (): Promise<FastifyInstance> => {
  const fastify = Fastify(fastifyConfig)

  await fastify.register(fastifySwagger, swaggerConfiguration)

  await fastify.register(getOriginLocations)

  fastify.listen({ port: config.PORT }, (err: Error | null, _: string) => {
    if (err) {
      throw err
    }
  })

  await fastify.ready()
  fastify.swagger()

  return fastify
}
