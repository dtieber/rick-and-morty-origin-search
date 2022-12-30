import * as dotenv from 'dotenv'
import * as env from 'env-var'

dotenv.config()

export const config = {
  LOG_LEVEL: env.get('LOG_LEVEL').required().asString(),
  PORT: env.get('PORT').required().asIntPositive(),
}
