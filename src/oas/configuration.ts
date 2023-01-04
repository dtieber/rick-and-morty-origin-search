import { config } from '../config'

export const swaggerConfiguration = {
  swagger: {
    info: {
      title: 'Rick and Morty Origin Search',
      version: '0.1.0',
    },
    host: `localhost:${config.PORT}`,
    schemes: [
      'http',
    ],
    consumes: [
      'application/json',
    ],
    produces: [
      'application/json',
    ],
  },
}
