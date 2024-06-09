import { Preferences, PreferencesRepository } from '@/domain'

export interface PreferencesService {
  get: () => Promise<Preferences | undefined>
  set: (preferences: Partial<Preferences>) => Promise<void>
}

export const createPreferencesService = (preferencesRepository: PreferencesRepository): PreferencesService => {
  return {
    get: async () => {
      return await preferencesRepository.get()
    },
    set: async (preferences) => {
      return await preferencesRepository.set(preferences)
    },
  }
}
