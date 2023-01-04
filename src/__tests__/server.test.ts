import { describe, expect, it } from '@jest/globals'

import { startServer } from '../server'

describe('server', () => {
  it('starts up and healthcheck returns 200', async () => {
    const application = await startServer()

    const response = await application.inject({
      method: 'GET',
      url: '/health',
    })

    expect(response.statusCode).toEqual(200)
  })
})
