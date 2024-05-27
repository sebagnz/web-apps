import { round } from './number'

export const Currency = {
  EUR: '€',
  USD: '$',
} as const

export type CurrencyType = typeof Currency

export const Scale = {
  '': 1,
  k: 1000,
  M: 1000000,
} as const

export type ScaleType = typeof Scale

type FormatParams = { value: number; currency?: keyof CurrencyType; scale?: keyof ScaleType; precision?: number }

export const formatBalance = ({ value, currency = 'EUR', scale = '', precision }: FormatParams): string => {
  const currencySymbol = Currency[currency]
  const scaledValue = value / Scale[scale]
  const roundedValue = round(scaledValue, precision)
  const stringValue = roundedValue.toLocaleString()
  const scaleUnit = scale

  let balance = `${currencySymbol} ${stringValue}`

  if (scaleUnit) {
    balance = `${balance} ${scaleUnit}`
  }

  return balance
}
