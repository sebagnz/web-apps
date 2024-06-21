import { round } from '@/utils'
import { useCallback, useMemo } from 'react'

import { CurrencyCode } from '@/domain'

import { useCurrencies } from '../currencies'
import { usePreferences } from '../preferences'

export const SCALES = { '': 1, k: 1000, M: 1000000 } as const

type FormatBalanceParams = {
  value: number
  currencyCode?: CurrencyCode
  scale?: keyof typeof SCALES
  precision?: number
}

export const useBalances = () => {
  const { preferences } = usePreferences()
  const { mainCurrency, currencies } = useCurrencies()

  const hideBalances = useMemo(() => Boolean(preferences?.hideBalances ?? true), [preferences])

  const hideable = useCallback((balance: string | null) => (hideBalances ? '••••••' : balance), [hideBalances])

  const formatBalance = ({ value, currencyCode, scale, precision }: FormatBalanceParams) => {
    if (hideBalances === null || mainCurrency === null || !currencies) return null

    const currency = currencies[currencyCode || mainCurrency.code]

    let scaleUnit = scale
    let scaleFactor = SCALES[scaleUnit || '']
    const scaledValue = value / scaleFactor
    const roundedValue = round(scaledValue, precision)

    let balance = roundedValue.toLocaleString()

    if (currency.symbol) {
      balance = `${currency.symbol} ${balance}`
    }
    if (scaleUnit) {
      balance = `${balance} ${scaleUnit}`
    }

    return balance
  }

  return {
    hideBalances,
    hideable,
    formatBalance: useCallback(formatBalance, [hideBalances, mainCurrency, currencies]),
  }
}
