import { z } from 'zod'

import { CurrencyCodeSchema } from '../currencies'

export const AccountSchema = z.object({
  id: z.string(),
  name: z.string(),
  balance: z.number(),
  currencyCode: CurrencyCodeSchema,
})

export const AccountListSchema = z.array(AccountSchema)

export type Account = z.infer<typeof AccountSchema>
export type AccountList = z.infer<typeof AccountListSchema>
