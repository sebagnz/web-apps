import { PreferencesRepository, PreferencesSchema } from '@/domain'

const LOCALSTORAGE_NAMESPACE = 'fingarden'
const LOCALSTORAGE_PREFERENCES_KEY = `${LOCALSTORAGE_NAMESPACE}:preferences`

export const createLocalStoragePreferencesRepository = (): PreferencesRepository => {
  return {
    get: async () => {
      const maybePreferences = JSON.parse(localStorage.getItem(LOCALSTORAGE_PREFERENCES_KEY) || '{}')
      const preferences = PreferencesSchema.parse(maybePreferences)
      return preferences
    },
    set: async (newPreferences) => {
      const maybePreferences = JSON.parse(localStorage.getItem(LOCALSTORAGE_PREFERENCES_KEY) || '{}')
      const preferences = PreferencesSchema.parse(maybePreferences)
      localStorage.setItem(LOCALSTORAGE_PREFERENCES_KEY, JSON.stringify({ ...preferences, ...newPreferences }))
    },
  }
}
