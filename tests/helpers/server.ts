import { Server } from 'http'

import { logger } from '~/common/logger'
import { PORT } from '~/config/env'
import { server as applicationServer } from '~/server'

export let runningServer: Server

export const startServer = async (): Promise<void> => {
  const app = await applicationServer()
  runningServer = app.listen(PORT, () => logger.info(`Test server is running on port: ${PORT}!`))
}

export const closeServer = async (): Promise<void> => {
  return new Promise(resolve => runningServer.close(() => resolve()))
}
