import axios, { AxiosResponse } from 'axios'

import request from 'supertest'
import { startServer, closeServer, runningServer as server } from 'tests/helpers/server'
import { expectedHistoryResult, expectedHistoryResultConverted } from 'tests/helpers/stock'
import { alphaVantageQuoteResult } from '~/@types/stock'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('stock', () => {
  beforeAll(startServer)

  test('should send a requisition to stock route and get status 204', async () => {
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

    const getActualPricePromises = Promise.resolve({ data: expectAlphaVantageResult } as AxiosResponse)
    const expectResult = { lastPrice: 132.21, name: 'IBM', pricedAt: '2022-04-29' }

    mockedAxios.get.mockReturnValueOnce(getActualPricePromises)

    const responseGet = await request(server).get(`/stocks/IBM/quote`)

    expect(responseGet.statusCode).toBe(200)
    expect(responseGet.body).toEqual(expectResult)
  })

  test('should send a inexistent stock name and return error', async () => {
    const expectAlphaVantageResult = {
      'Global Quote': {}
    }

    const getActualPricePromises = Promise.resolve({ data: expectAlphaVantageResult } as AxiosResponse)

    mockedAxios.get.mockReturnValueOnce(getActualPricePromises)
    const responseGet = await request(server).get(`/stocks/inexistent/quote`)

    expect(responseGet.statusCode).toBe(400)
    expect(responseGet.body.message).toBe('Stock with name inexistent not found')
  })

  test('should send a requisition with a time filter and get result', async () => {
    const expectAlphaVantageHistoryResult = await expectedHistoryResult()

    const getHistoryPromise = Promise.resolve({ data: expectAlphaVantageHistoryResult } as AxiosResponse)
    const expectResult = await expectedHistoryResultConverted()

    mockedAxios.get.mockReturnValueOnce(getHistoryPromise)
    const responseGet = await request(server).get(`/stocks/IBM/history?from=2022-04-25&to=2022-04-29`)

    expect(responseGet.statusCode).toBe(200)
    expect(responseGet.body).toEqual(expectResult)
  })

  test('should send a inexistent stock name and return error on History', async () => {
    const getHistoryPromise = Promise.resolve({ data: { error: '' } } as AxiosResponse)

    mockedAxios.get.mockReturnValueOnce(getHistoryPromise)
    const responseGet = await request(server).get(`/stocks/inexistent/history?from=2022-04-25&to=2022-04-29`)

    expect(responseGet.statusCode).toBe(400)
    expect(responseGet.body.message).toBe('Stock with name inexistent not found')
  })

  test('should send a requisition with two actions and receive a the both data', async () => {
    const expectAlphaVantageResult1: alphaVantageQuoteResult = {
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

    const expectAlphaVantageResult2: alphaVantageQuoteResult = {
      'Global Quote': {
        '01. symbol': 'FORD',
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

    const expectAlphaVantageResult3: alphaVantageQuoteResult = {
      'Global Quote': {
        '01. symbol': 'TEST',
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

    const getActualPricePromises1 = Promise.resolve({ data: expectAlphaVantageResult1 } as AxiosResponse)
    const getActualPricePromises2 = Promise.resolve({ data: expectAlphaVantageResult2 } as AxiosResponse)
    const getActualPricePromises3 = Promise.resolve({ data: expectAlphaVantageResult3 } as AxiosResponse)

    const expectedResult = {
      lastPrices: [
        {
          lastPrice: 132.21,
          name: 'IBM',
          pricedAt: '2022-04-29'
        },
        {
          lastPrice: 132.21,
          name: 'FORD',
          pricedAt: '2022-04-29'
        },
        {
          lastPrice: 132.21,
          name: 'TEST',
          pricedAt: '2022-04-29'
        }
      ]
    }

    mockedAxios.get
      .mockReturnValueOnce(getActualPricePromises1)
      .mockReturnValueOnce(getActualPricePromises2)
      .mockReturnValueOnce(getActualPricePromises3)

    const responseGet = await request(server)
      .get(`/stocks/IBM/compare`)
      .query({ stocksToCompare: ['FORD', 'TEST'] })

    expect(responseGet.statusCode).toBe(200)
    expect(responseGet.body).toEqual(expectedResult)
  })

  test('should send a requisition with a stock and receive a gain compare of period', async () => {
    const expectAlphaVantageHistoryResult = await expectedHistoryResult()

    const getHistoryPromise = Promise.resolve({ data: expectAlphaVantageHistoryResult } as AxiosResponse)
    const expectResult = {
      name: 'IBM',
      lastPrice: 132.21,
      priceAtDate: 130.15,
      purchasedAmount: '25',
      purchasedAt: '2022-04-01',
      capitalGains: -51.50000000000006
    }

    mockedAxios.get.mockReturnValueOnce(getHistoryPromise)
    const responseGet = await request(server).get(`/stocks/IBM/gains?purchasedAt=2022-04-01&purchasedAmount=25`)

    expect(responseGet.statusCode).toBe(200)
    expect(responseGet.body).toEqual(expectResult)
  })

  afterAll(closeServer)
})
