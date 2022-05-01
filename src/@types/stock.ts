export type Quote = {
  name: string
  lastPrice: number
  pricedAt: string
}

export type History = {
  name: string
  prices: HistoryEntry[]
}

export type HistoryEntry = {
  opening: number
  low: number
  high: number
  closing: number
  pricedAt: string
  volume: number
}

export type alphaVantageQuoteResult = {
  'Global Quote': {
    '01. symbol': string
    '02. open': string
    '03. high': string
    '04. low': string
    '05. price': string
    '06. volume': string
    '07. latest trading day': Date
    '08. previous close': string
    '09. change': string
    '10. change percent': string
  }
}

export interface alphaVantageQuoteResultHistory {
  'Meta Data': MetaData
  'Time Series (Daily)': { [key: string]: TimeSeriesDaily }
}

interface MetaData {
  '1. Information': string
  '2. Symbol': string
  '3. Last Refreshed': Date
  '4. Output Size': string
  '5. Time Zone': string
}

interface TimeSeriesDaily {
  '1. open': string
  '2. high': string
  '3. low': string
  '4. close': string
  '5. volume': string
}

export interface ComparisonResult {
  lastPrices: Quote[]
}
