import { createPreferencesService } from '@/services'

import { createLocalStoragePreferencesRepository } from './preferences-local-storage-repository'
import { createUsePreferences } from './use-preferences'

const preferencesRepository = createLocalStoragePreferencesRepository()

const preferencesService = createPreferencesService(preferencesRepository)

export const usePreferences = createUsePreferences(preferencesService)

export { PREFERENCES_CACHE_KEY } from './use-preferences'
