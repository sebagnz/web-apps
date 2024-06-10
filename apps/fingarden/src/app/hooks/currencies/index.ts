import { useMemo } from 'react'

import { usePreferences } from '@/hooks/preferences'

import { Currency } from '@/domain'

const CURRENCIES: Record<Currency['code'], Currency> = {
  EUR: {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
  },
  USD: {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
  },
}

export const useCurrencies = () => {
  const { preferences } = usePreferences()

  const mainCurrency = useMemo<Currency | null>(() => {
    if (!preferences) return null
    return CURRENCIES[preferences.mainCurrency]
  }, [preferences])

  return { mainCurrency }
}
