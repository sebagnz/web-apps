import { PreferencesService, createPreferencesService } from '@/services'

import { createFirestorePreferencesRepository } from './preferences-firestore-repository'
import { createLocalStoragePreferencesRepository } from './preferences-local-storage-repository'
import { createUsePreferences } from './use-preferences'

let preferencesService: PreferencesService

if (process.env.NEXT_PUBLIC_STORAGE === 'local-storage') {
  const preferencesRepository = createLocalStoragePreferencesRepository()
  preferencesService = createPreferencesService(preferencesRepository)
} else {
  const preferencesRepository = createFirestorePreferencesRepository()
  preferencesService = createPreferencesService(preferencesRepository)
}

export const usePreferences = createUsePreferences(preferencesService)

export { PREFERENCES_CACHE_KEY } from './use-preferences'
