import axios from 'axios'
import { StockNotFoundError } from '~/@types/error'
import { alphaVantageQuoteResult, alphaVantageQuoteResultHistory, ComparisonResult, History, Quote, StockGains } from '~/@types/stock'
import { StocksToCompareParam } from './controller'

export const getActualPrice = async (stockName: string) => {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY
  const applyFunction = 'GLOBAL_QUOTE'

  const responseGet = await axios.get(`https://www.alphavantage.co/query/?function=${applyFunction}&symbol=${stockName}&apikey=${apiKey}`)

  const alphaRequestInstanceData: alphaVantageQuoteResult = responseGet.data
  if (Object.keys(alphaRequestInstanceData['Global Quote']).length === 0) throw new StockNotFoundError(stockName)

  const quote: Quote = {
    lastPrice: parseFloat(alphaRequestInstanceData['Global Quote']['05. price']),
    name: alphaRequestInstanceData['Global Quote']['01. symbol'],
    pricedAt: `${alphaRequestInstanceData['Global Quote']['07. latest trading day']}`
  }

  return quote
}

export const getActionHistory = async (stockName: string, from: string, to: string) => {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY
  const applyFunction = 'TIME_SERIES_DAILY'
  const fromDate = new Date(from)
  const toDate = new Date(to)

  try {
    const responseGet = await axios.get(`https://www.alphavantage.co/query?function=${applyFunction}&symbol=${stockName}&apikey=${apiKey}`)
    const result: alphaVantageQuoteResultHistory = responseGet.data

    const history: History = {
      name: stockName,
      prices: []
    }

    Object.keys(result['Time Series (Daily)']).map(date => {
      const entry = result['Time Series (Daily)'][date]
      const dateFilter = new Date(date)

      if (dateFilter >= fromDate && dateFilter <= toDate) {
        history.prices.push({
          opening: parseFloat(entry['1. open']),
          low: parseFloat(entry['3. low']),
          high: parseFloat(entry['2. high']),
          closing: parseFloat(entry['4. close']),
          pricedAt: date,
          volume: parseFloat(entry['5. volume'])
        })
      }
    })

    return history
  } catch (error) {
    throw new StockNotFoundError(stockName)
  }
}

export const getComparison = async (stockName: string, stocksToCompare: StocksToCompareParam) => {
  const stocks = [stockName, ...stocksToCompare.stocksToCompare]
  const comparison: ComparisonResult = {
    lastPrices: []
  }

  for (const stock of stocks) {
    const quote = await getActualPrice(stock)
    comparison.lastPrices.push(quote)
  }

  return comparison
}

export const getGains = async (stockName: string, purchasedAt: string, amount: number) => {
  const history = await getActionHistory(stockName, purchasedAt, new Date().toISOString())
  const actualState = history.prices[0]
  const lastState = history.prices[history.prices.length - 1]

  const gains: StockGains = {
    name: stockName,
    lastPrice: actualState.closing,
    priceAtDate: lastState.closing,
    purchasedAmount: amount,
    purchasedAt: purchasedAt,
    capitalGains: (lastState.closing - actualState.closing) * amount
  }

  return gains
}
