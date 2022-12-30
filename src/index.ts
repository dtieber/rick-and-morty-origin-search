import Fastify from 'fastify'

import { config } from './config'
import { loggerConfig } from './logger/logging.configuration'

const fastifyConfig = {
  logger: loggerConfig,
}

const fastify = Fastify(fastifyConfig)

fastify.listen({ port: config.PORT }, (err: Error | null, _: string) => {
  if (err) {
    throw err
  }
})
