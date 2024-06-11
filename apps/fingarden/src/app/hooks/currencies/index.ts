import { createCurrenciesService } from '@/services'

import { createCurrenciesRepository } from './currencies-inmemory-repository'
import { createCurrencyRatesRepository } from './currency-rates-network-repository'
import { createUseCurrencies } from './use-currencies'

const currenciesRepository = createCurrenciesRepository()

const currencyRatesRepository = createCurrencyRatesRepository()

const currenciesService = createCurrenciesService(currenciesRepository, currencyRatesRepository)

export const useCurrencies = createUseCurrencies(currenciesService)

export { CURRENCIES_CACHE_KEY, CURRENCY_RATES_CACHE_KEY } from './use-currencies'
