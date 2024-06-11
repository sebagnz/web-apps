import { CurrenciesRepository, CurrencyCode, CurrencyList, CurrencyRates, CurrencyRatesRepository } from '@/domain'

export interface CurrenciesService {
  getAll: () => Promise<CurrencyList>
  getRates: (baseCurrency: CurrencyCode, currencies: Array<CurrencyCode>) => Promise<CurrencyRates>
}

export const createCurrenciesService = (
  currenciesRepository: CurrenciesRepository,
  currencyRatesRepository: CurrencyRatesRepository,
): CurrenciesService => {
  return {
    getAll: async () => {
      return currenciesRepository.getAll()
    },
    getRates: async (baseCurrency, currencies) => {
      return currencyRatesRepository.get(baseCurrency, currencies)
    },
  }
}
