import { CurrenciesRepository } from './currencies-repository'
import { CurrencyList, CurrencyRates } from './currency'
import { CurrencyRatesRepository } from './currency-rates-repository'

export const createMockCurrencies: (override?: Partial<CurrencyList>) => CurrencyList = (override = {}) => {
  return {
    USD: { code: 'USD', name: 'US Dollar', symbol: '$' },
    EUR: { code: 'EUR', name: 'Euro', symbol: '€' },
    ...override,
  }
}

export const createMockCurrenciesRepository: () => CurrenciesRepository = () => {
  return {
    getAll: async () => createMockCurrencies(),
  }
}

export const createMockCurrencyRates: (override?: Partial<CurrencyRates>) => CurrencyRates = (override = {}) => {
  return {
    EUR: 1,
    USD: 1.07,
    ...override,
  }
}

export const createMockCurrencyRatesRepository: () => CurrencyRatesRepository = () => {
  return {
    get: async () => createMockCurrencyRates(),
  }
}
