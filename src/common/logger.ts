import { createLogger, transports, Logger, format } from 'winston'


export class LoggingService {
  logger: Logger

  static get Instance() {
    return new LoggingService()
  }

  format = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  )



  validateSizeLimit(input: string) {
    const regex = /[0-9]+[k,m,g]/
    return regex.test(input)
  }

  constructor() {
    const sizeLimitLog = '20m'



    this.logger = createLogger({
      format: this.format,
      transports: [new transports.Console()],
      exceptionHandlers: [new transports.File({ filename: `./logs/exceptions/application.log` })]
    })
  }

  info(message: string) {
    this.logger.info(message)
  }

  warn(message: string) {
    this.logger.warn(message)
  }

  error(message: string) {
    this.logger.error(message)
  }

  http(message: string) {
    this.logger.http(message)
  }
}

export const logger = LoggingService.Instance