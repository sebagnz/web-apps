import { z } from 'zod'

export const CurrencySchema = z.object({
  code: z.union([z.literal('USD'), z.literal('EUR')]),
  name: z.string(),
  symbol: z.string(),
})

export type Currency = z.infer<typeof CurrencySchema>
