import { Preferences } from './preferences'
import { PreferencesRepository } from './preferences-repository'

export const createMockPreferences: (override?: Partial<Preferences>) => Preferences = (override = {}) => {
  return { hideBalances: false, ...override }
}

export const createMockPreferencesRepository: () => PreferencesRepository = () => {
  return {
    get: async () => createMockPreferences(),
    set: async (preferences) => {},
  }
}
