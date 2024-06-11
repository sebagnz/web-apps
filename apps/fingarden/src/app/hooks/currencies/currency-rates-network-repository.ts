import { CurrencyCode, CurrencyRatesRepository } from '@/domain'

export const createCurrencyRatesRepository = (): CurrencyRatesRepository => {
  const get = async (baseCurrency: CurrencyCode, targetCurrencies: Array<CurrencyCode>) => {
    const baseUrl = '/api/currency/rates'
    const base_currency = baseCurrency
    const currencies = targetCurrencies.join(',')
    const url = `${baseUrl}?${new URLSearchParams({ base_currency, currencies })}`
    const res = await fetch(url)
    return res.json()
  }

  return { get }
}
