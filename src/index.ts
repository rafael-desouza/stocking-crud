import 'reflect-metadata'

import { server } from './server'
import { logger } from './common/logger'
import { PORT } from './config/env'

server().then(app => app.listen(PORT, () => logger.info(`Server is running on port ${PORT}!`)))
