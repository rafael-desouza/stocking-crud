import { logger } from '~/common/logger'

export class StockNotFoundError extends Error {
  constructor(stockName: string) {
    logger.error(`Stock with name ${stockName} not found`)
    super(`Stock with name ${stockName} not found`)
  }
}
