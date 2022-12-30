import type { PinoLoggerOptions } from 'fastify/types/logger'

import { config } from '../config'
import { logLevelFormatter, timestampFormatter } from './logging.formatters'

const loggerFormatters = {
  level: logLevelFormatter,
}

export const loggerConfig: PinoLoggerOptions = {
  level: config.LOG_LEVEL,
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
