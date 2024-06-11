import { useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'
import { CurrenciesService } from 'src/app/services/currencies/currencies-service'
import useSWR from 'swr'

import { usePreferences } from '@/hooks/preferences'

import { CurrencyCode } from '@/domain'

export const CURRENCIES_CACHE_KEY = ['currencies']
export const CURRENCY_RATES_CACHE_KEY = ['currencies', 'rates']

const revalidateOnFocus = false
const dedupingInterval = 1000 * 60 * 10
const keepPreviousData = true

export const createUseCurrencies = (currenciesService: CurrenciesService) => () => {
  const { preferences, isLoading: isLoadingPreferences } = usePreferences()

  const {
    data: currencies,
    error: currenciesError,
    isLoading,
  } = useSWR(CURRENCIES_CACHE_KEY, () => currenciesService.getAll(), {
    revalidateOnFocus,
    dedupingInterval,
    keepPreviousData,
  })

  const mainCurrency = useMemo(() => {
    if (!preferences) return null
    return preferences.mainCurrency
  }, [preferences])

  const currencyCodes = useMemo<Array<CurrencyCode>>(() => {
    if (!currencies) return []
    return Object.keys(currencies) as Array<keyof typeof currencies>
  }, [currencies])

  const currencyRatesKey = useMemo(() => {
    if (!mainCurrency || !currencyCodes) return null
    return CURRENCY_RATES_CACHE_KEY.concat(...currencyCodes)
  }, [mainCurrency, currencyCodes])

  const {
    data: currencyRates,
    error: currencyRatesError,
    isLoading: isLoadingCurrencyRates,
  } = useSWR(currencyRatesKey, () => currenciesService.getRates(mainCurrency!, currencyCodes), {
    revalidateOnFocus,
    dedupingInterval,
    keepPreviousData,
  })

  const isLoadingCurrencies = useMemo(() => isLoadingPreferences || isLoading, [isLoadingPreferences, isLoading])

  useEffect(() => {
    if (currenciesError) toast.error(currenciesError.message)
    if (currencyRatesError) toast.error(currencyRatesError.message)
  }, [currenciesError, currencyRatesError])

  return {
    mainCurrency,
    currencies,
    currencyRates,
    isLoadingCurrencies,
    isLoadingCurrencyRates,
  }
}
