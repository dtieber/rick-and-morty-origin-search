import Fastify from 'fastify'

import { loggerConfig } from './logger/logging.configuration'

const fastifyConfig = {
  logger: loggerConfig,
}

const fastify = Fastify(fastifyConfig)

fastify.listen({ port: 3000 }, (err: Error | null, _: string) => {
  if (err) {
    throw err
  }
})
