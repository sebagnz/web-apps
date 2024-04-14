import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

import { getFirebaseApp } from '@/hooks/firebase'

import { AuthProvider } from '@/domain'

export const createAuthFirebaseProvider = (): AuthProvider => {
  const firebaseApp = getFirebaseApp()

  const auth = getAuth()

  return {
    register: async (email: string, password: string) => {
      await createUserWithEmailAndPassword(auth, email, password)
    },
    loginWithEmail: async (email: string, password: string) => {
      await signInWithEmailAndPassword(auth, email, password)
    },
    loginWithGoogle: async () => {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    },
    logout: async () => {
      await signOut(auth)
    },
    getLoggerUser: async () => {
      await auth.authStateReady()
      if (!auth.currentUser) return null
      return { id: auth.currentUser.uid }
    },
    onAuthStateChanged: (callback) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) callback(null)
        else callback({ id: user.uid })
      })

      return unsubscribe
    },
  }
}
