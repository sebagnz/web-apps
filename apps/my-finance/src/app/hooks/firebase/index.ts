import { getApps, initializeApp } from 'firebase/app'
import { QueryDocumentSnapshot, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

export const getFirebaseApp = () => {
  const [firebaseApp] = getApps()
  return firebaseApp || initializeApp(firebaseConfig)
}

export const getFirestoreDB = () => {
  const firebaseApp = getFirebaseApp()
  const firestoreDB = getFirestore(firebaseApp)
  return firestoreDB
}

export type FirestoreConverer<TDB, TDomain> = {
  toFirestore: (data: TDomain) => TDB
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: any) => TDomain
}
