import type { PinoLoggerOptions } from 'fastify/types/logger'

import { logLevelFormatter, timestampFormatter } from './logging.formatters'

const loggerFormatters = {
  level: logLevelFormatter,
}

export const loggerConfig: PinoLoggerOptions = {
  level: 'info',
  messageKey: 'msg',
  formatters: loggerFormatters,
  redact: {
    paths: [
      'hostname',
      'pid',
    ],
    remove: true,
  },
  timestamp: timestampFormatter,
}
