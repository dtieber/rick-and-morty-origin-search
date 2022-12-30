import type { FastifyInstance } from 'fastify'
import Fastify from 'fastify'

import { config } from './config'
import { loggerConfig } from './logger/logging.configuration'

const fastifyConfig = {
  logger: loggerConfig,
}

export const startServer = async (): Promise<FastifyInstance> => {
  const fastify = Fastify(fastifyConfig)

  fastify.listen({ port: config.PORT }, (err: Error | null, _: string) => {
    if (err) {
      throw err
    }
  })

  await fastify.ready()

  return fastify
}
