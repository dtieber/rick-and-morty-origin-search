import * as fastifySwagger from '@fastify/swagger'
import * as fastifySwaggerUi from '@fastify/swagger-ui'
import type { FastifyInstance } from 'fastify'
import Fastify from 'fastify'
import * as fastifyHealthcheck from 'fastify-healthcheck'

import { config } from './config'
import { loggerConfig } from './logger/logging.configuration'
import { swaggerConfiguration, swaggerUiConfiguration } from './oas/configuration'
import { getOriginLocations } from './routes/get-origin-locations.route'

const fastifyConfig = {
  logger: loggerConfig,
}

export const startServer = async (): Promise<FastifyInstance> => {
  const fastify = Fastify(fastifyConfig)

  await fastify.register(fastifySwagger, swaggerConfiguration)
  await fastify.register(fastifySwaggerUi, swaggerUiConfiguration)

  await fastify.register(fastifyHealthcheck)
  await fastify.register(getOriginLocations)

  await fastify.listen({ port: config.PORT })

  await fastify.ready()
  fastify.swagger()

  return fastify
}
