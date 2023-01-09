import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import type { FastifyInstance } from 'fastify'

import { startServer } from '../server'

describe('server', () => {

  let application: FastifyInstance

  beforeAll(async() => {
    application = await startServer()
  })

  afterAll(async() => {
    await application.close()
  })

  it('starts up and healthcheck returns 200', async () => {
    const response = await application.inject({
      method: 'GET',
      url: '/health',
    })

    expect(response.statusCode).toEqual(200)
  })
})
