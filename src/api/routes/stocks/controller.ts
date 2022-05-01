import { Get, HttpCode, JsonController, OnUndefined, Param } from 'routing-controllers'
import { getActualPrice } from './service'

@JsonController('/stock')
export class StocksController {
  @Get('/:stockName/quote')
  @HttpCode(200)
  @OnUndefined(500)
  getAll(@Param('stockName') stockName: string) {
    return getActualPrice(stockName)
  }
}
