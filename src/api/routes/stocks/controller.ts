import { Get, HttpCode, JsonController, Param } from 'routing-controllers'
import { getActualPrice } from './service'

@JsonController('/stock')
export class StocksController {
  @Get('/:stockName/quote')
  @HttpCode(204)
  async getAll(@Param('stockName') stockName: string) {
    const result = await getActualPrice(stockName)
    return result
  }
}
