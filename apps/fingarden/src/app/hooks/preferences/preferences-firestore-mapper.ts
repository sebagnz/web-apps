import { FirestoreMapper } from '@/hooks/firebase'

import { Preferences, PreferencesSchema } from '@/domain'

type DBPreferences = Preferences

export const createPreferencesMapper = (): FirestoreMapper<DBPreferences, Preferences> => ({
  toFirestore: (preferences) => preferences,
  fromFirestore: (preferences, options) => PreferencesSchema.parse(preferences.data(options)),
})
