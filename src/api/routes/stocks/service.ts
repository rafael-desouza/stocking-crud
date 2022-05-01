import axios from 'axios'
import { alphaVantageQuoteResult, Quote } from '~/@types/stock'

export const getActualPrice = async (stockName: string) => {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY
  const applyFunction = 'GLOBAL_QUOTE'

  const responseGet = await axios.get(`https://www.alphavantage.co/query/?function=${applyFunction}&symbol=${stockName}&apikey=${apiKey}`)

  const alphaRequestInstanceData: alphaVantageQuoteResult = responseGet.data
  const quote: Quote = {
    lastPrice: parseFloat(alphaRequestInstanceData['Global Quote']['05. price']),
    name: alphaRequestInstanceData['Global Quote']['01. symbol'],
    pricedAt: `${alphaRequestInstanceData['Global Quote']['07. latest trading day']}`
  }

  return quote
}
