export class StockNotFoundError extends Error {
  constructor(stockName: string) {
    super(`Stock with name ${stockName} not found`)
  }
}
