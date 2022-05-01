import axios, { AxiosResponse } from 'axios'

import request from 'supertest'
import { startServer, closeServer, runningServer as server } from 'tests/helpers/server'
import { alphaVantageQuoteResult } from '~/@types/stock'
import { getActualPrice } from '~/api/routes/stocks/service'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('stock', () => {
  beforeAll(startServer)

  test('should send a requistion to stock route and get status 204', async () => {
    const expectAlphaVantageResult: alphaVantageQuoteResult = {
      'Global Quote': {
        '01. symbol': 'IBM',
        '02. open': '135.1300',
        '03. high': '135.5545',
        '04. low': '132.0000',
        '05. price': '132.2100',
        '06. volume': '5078660',
        '07. latest trading day': '2022-04-29' as unknown as Date,
        '08. previous close': '135.7400',
        '09. change': '-3.5300',
        '10. change percent': '-2.6006%'
      }
    }

    const getActualPricePromisse = Promise.resolve({ data: expectAlphaVantageResult } as AxiosResponse)

    mockedAxios.get.mockReturnValueOnce(getActualPricePromisse)

    const responseGet = await request(server).get(`/stock/IBM/quote`)

    expect(responseGet.statusCode).toBe(204)
  })

  test('should find a value of an action and bring parsed into Quote format', async () => {
    const expectAlphaVantageResult: alphaVantageQuoteResult = {
      'Global Quote': {
        '01. symbol': 'IBM',
        '02. open': '135.1300',
        '03. high': '135.5545',
        '04. low': '132.0000',
        '05. price': '132.2100',
        '06. volume': '5078660',
        '07. latest trading day': '2022-04-29' as unknown as Date,
        '08. previous close': '135.7400',
        '09. change': '-3.5300',
        '10. change percent': '-2.6006%'
      }
    }

    const expectResult = { lastPrice: 132.21, name: 'IBM', pricedAt: '2022-04-29' }

    const getActualPricePromisse = Promise.resolve({ data: expectAlphaVantageResult } as AxiosResponse)

    mockedAxios.get.mockReturnValueOnce(getActualPricePromisse)
    const responseGet = getActualPrice('IBM')

    expect(responseGet).resolves.toEqual(expectResult)
  })

  afterAll(closeServer)
})
