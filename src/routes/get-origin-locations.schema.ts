import type { FastifySchema } from 'fastify/types/schema'

export const requestSchema: FastifySchema = {
  querystring: {
    type: 'object',
    required: [
      'q',
    ],
    properties: {
      q: {
        type: 'string',
      },
    },
  },
}

export const responseSchema: FastifySchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        hits: {
          type: 'object',
          properties: {
            meta: {
              type: 'object',
              properties: {
                total: {
                  type: 'number',
                },
              },
              required: [
                'total',
              ],
            },
            origins: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            details: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  episodeRef: {
                    type: 'string',
                  },
                  episodeName: {
                    type: 'string',
                  },
                  characters: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        name: {
                          type: 'string',
                        },
                        origin: {
                          type: 'object',
                          properties: {
                            name: {
                              type: 'string',
                            },
                            type: {
                              type: 'string',
                            },
                          },
                          required: [
                            'name',
                          ],
                        },
                      },
                      required: [
                        'name',
                      ],
                    },
                  },
                },
                required: [
                  'episodeRef',
                  'episodeName',
                  'characters',
                ],
              },
            },
          },
          required: [
            'meta',
            'origins',
            'details',
          ],
        },
      },
      required: [
        'hits',
      ],
    },
    500: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      required: [
        'message',
      ],
    },
  },
}
