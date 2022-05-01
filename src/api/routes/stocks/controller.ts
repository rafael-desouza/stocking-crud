import { Get, HttpCode, JsonController, OnUndefined, Param, QueryParams } from 'routing-controllers'
import { getActionHistory, getActualPrice } from './service'

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
}

type StockParam = {
  from: string
  to: string
}
