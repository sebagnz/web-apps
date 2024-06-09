import { z } from 'zod'

export const PreferencesSchema = z.object({
  hideBalances: z.boolean().default(false),
})

export type Preferences = z.infer<typeof PreferencesSchema>
