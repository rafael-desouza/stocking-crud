import { Get, HttpCode, JsonController, OnUndefined, Param, QueryParams } from 'routing-controllers'
import { getActionHistory, getActualPrice, getComparison, getGains } from './service'

@JsonController('/stocks')
export class StocksController {
  @Get('/:stockName/quote')
  @HttpCode(200)
  @OnUndefined(500)
  getPrice(@Param('stockName') stockName: string) {
    return getActualPrice(stockName)
  }

  @Get('/:stockName/history?')
  @HttpCode(200)
  @OnUndefined(500)
  getHistory(@Param('stockName') stockName: string, @QueryParams() queryParams: StockParam) {
    return getActionHistory(stockName, queryParams.from, queryParams.to)
  }

  @Get('/:stockName/compare')
  @HttpCode(200)
  @OnUndefined(500)
  getComparison(@Param('stockName') stockName: string, @QueryParams() stocksToCompare: StocksToCompareParam) {
    return getComparison(stockName, stocksToCompare)
  }

  @Get('/:stockName/gains')
  @HttpCode(200)
  @OnUndefined(500)
  getGains(@Param('stockName') stockName: string, @QueryParams() queryParams: StockGainsParam) {
    return getGains(stockName, queryParams.purchasedAt, queryParams.purchasedAmount)
  }
}

type StockGainsParam = {
  purchasedAt: string
  purchasedAmount: number
}

type StockParam = {
  from: string
  to: string
}

export type StocksToCompareParam = {
  stocksToCompare: string[]
}
