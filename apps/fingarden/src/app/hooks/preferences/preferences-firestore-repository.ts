import { getAuth } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { PREFERENCES_FIRESTORE_COLLECTION_PATH, getFirestoreDB } from '@/hooks/firebase'

import { PreferencesRepository } from '@/domain'

import { createPreferencesMapper } from './preferences-firestore-mapper'

const getUserId = () => {
  const auth = getAuth()
  const userId = auth.currentUser?.uid
  if (!userId) throw new Error('User not authenticated')
  return userId
}

export const createFirestorePreferencesRepository = (): PreferencesRepository => {
  const db = getFirestoreDB()

  return {
    get: async () => {
      const userId = getUserId()
      const converter = createPreferencesMapper()
      const preferencesRef = doc(db, PREFERENCES_FIRESTORE_COLLECTION_PATH, userId).withConverter(converter)
      const preferencesSnap = await getDoc(preferencesRef)
      const preferences = preferencesSnap.data()
      return preferences
    },
    set: async (preferences) => {
      const userId = getUserId()
      const preferencesRef = doc(db, PREFERENCES_FIRESTORE_COLLECTION_PATH, userId)
      await setDoc(preferencesRef, preferences, { merge: true })
    },
  }
}
