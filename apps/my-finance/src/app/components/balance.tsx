import { ComponentPropsWithoutRef } from 'react'

import { usePreferences } from '@/hooks/preferences'

const Currency = { EUR: '€', USD: '$' } as const

type CurrencyType = typeof Currency

type BalanceProps = { currency?: keyof CurrencyType; children: number | string }

type Props = Omit<ComponentPropsWithoutRef<'p'>, keyof BalanceProps> & BalanceProps

export const Balance = ({ currency = 'EUR', children, ...rest }: Props) => {
  const { preferences } = usePreferences()

  if (!preferences) return null

  const textContent = preferences.hideBalances ? '••••••' : children.toLocaleString()

  return (
    <p {...rest}>
      {Currency[currency]} {textContent}
    </p>
  )
}
