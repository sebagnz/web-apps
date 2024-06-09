import { Preferences, PreferencesRepository, PreferencesSchema } from '@/domain'

export interface PreferencesService {
  get: () => Promise<Preferences | undefined>
  set: (preferences: Partial<Preferences>) => Promise<void>
}

export const createPreferencesService = (preferencesRepository: PreferencesRepository): PreferencesService => {
  return {
    get: async () => {
      try {
        return await preferencesRepository.get()
      } catch (error) {
        return PreferencesSchema.parse(undefined)
      }
    },
    set: async (preferences) => {
      return await preferencesRepository.set(preferences)
    },
  }
}
