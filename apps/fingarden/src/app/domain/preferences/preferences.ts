import { z } from 'zod'

export const PreferencesSchema = z.object({
  hideBalances: z.boolean().default(false),
  mainCurrency: z.union([z.literal('USD'), z.literal('EUR')]).default('USD'),
})

export type Preferences = z.infer<typeof PreferencesSchema>
