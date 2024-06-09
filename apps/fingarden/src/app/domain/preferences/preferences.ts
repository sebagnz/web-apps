import { z } from 'zod'

import { CurrencySchema } from '../currencies/currency'

export const PreferencesSchema = z
  .object({
    hideBalances: z.boolean().default(false),
    mainCurrency: CurrencySchema.shape.code.default('USD'),
  })
  .default({})

export type Preferences = z.infer<typeof PreferencesSchema>
