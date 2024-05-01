import { Preferences, PreferencesRepository } from '@/domain'

export interface PreferencesService {
  get: () => Promise<Preferences>
  setHideBalances: (hideBalances: Preferences['hideBalances']) => Promise<void>
}

export const createPreferencesService = (preferencesRepository: PreferencesRepository): PreferencesService => {
  return {
    get: async () => {
      return await preferencesRepository.get()
    },
    setHideBalances: async (hideBalances: boolean) => {
      return await preferencesRepository.setHideBalances(hideBalances)
    },
  }
}
