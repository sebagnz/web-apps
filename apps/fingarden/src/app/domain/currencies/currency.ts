import { z } from 'zod'

export const CurrencyCodeSchema = z.union([z.literal('USD'), z.literal('EUR')])
export type CurrencyCode = z.infer<typeof CurrencyCodeSchema>

/**
 * Currency
 */
export const CurrencySchema = z.object({
  code: CurrencyCodeSchema,
  name: z.string(),
  symbol: z.string(),
  icon: z.string(),
})

export type Currency = z.infer<typeof CurrencySchema>

/**
 * Currency List
 */
type CurrenciesZodType = { [k in CurrencyCode]: typeof CurrencySchema }

export const CurrencyListSchema = z.object<CurrenciesZodType>({
  USD: CurrencySchema,
  EUR: CurrencySchema,
})

export type CurrencyList = z.infer<typeof CurrencyListSchema>

/**
 * Currency Rates
 */
export const CurrencyRatesSchama = z.record(CurrencyCodeSchema, z.number())
export type CurrencyRates = z.infer<typeof CurrencyRatesSchama>
