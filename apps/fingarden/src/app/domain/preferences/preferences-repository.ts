import { Preferences } from './preferences'

export interface PreferencesRepository {
  get: () => Promise<Preferences | undefined>
  set: (preferences: Partial<Preferences>) => Promise<void>
}
