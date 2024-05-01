import { Preferences } from './preferences'

export interface PreferencesRepository {
  get: () => Promise<Preferences>
  setHideBalances: (hideBalances: Preferences['hideBalances']) => Promise<void>
}
