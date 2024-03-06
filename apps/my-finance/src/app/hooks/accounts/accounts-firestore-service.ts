import { getAuth } from 'firebase/auth'
import { QueryDocumentSnapshot, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { z } from 'zod'

import { getFirestoreDB } from '@/hooks/firebase'

import { Account, AccountSchema, AccountsRepository } from '@/domain'

import { createAccountService } from '@/services'

const auth = getAuth()

type FirestoreConverer<T extends z.AnyZodObject> = {
  toFirestore: (data: z.infer<T>) => any
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: any) => z.infer<T>
}

const accountsConverter: FirestoreConverer<typeof AccountSchema> = {
  toFirestore: (account) => account,
  fromFirestore: (snapshot, options) => AccountSchema.parse({ id: snapshot.id, ...snapshot.data(options) }),
}

const ACCOUNTS_FIRESTORE_COLLECTION_PATH = 'accounts'

const createFirestoreAccountsRepository = (): AccountsRepository => {
  const db = getFirestoreDB()

  return {
    create: async (account: Omit<Account, 'id'>) => {
      const userId = auth.currentUser?.uid
      const accountsRef = collection(db, ACCOUNTS_FIRESTORE_COLLECTION_PATH)
      await setDoc(doc(accountsRef), { ...account, userId })
    },
    update: async (account: Account) => {
      const accountRef = doc(db, ACCOUNTS_FIRESTORE_COLLECTION_PATH, account.id)
      await updateDoc(accountRef, account)
    },
    delete: async (id: Account['id']) => {
      const accountRef = doc(db, ACCOUNTS_FIRESTORE_COLLECTION_PATH, id)
      await deleteDoc(accountRef)
    },
    getById: async (id: Account['id']) => {
      const accountRef = doc(db, ACCOUNTS_FIRESTORE_COLLECTION_PATH, id).withConverter(accountsConverter)
      const accountSnap = await getDoc(accountRef)
      const account = accountSnap.data()
      return account
    },
    getAll: async () => {
      const userId = auth.currentUser?.uid
      const accountsRef = collection(db, ACCOUNTS_FIRESTORE_COLLECTION_PATH)

      const q = query(accountsRef, where('userId', '==', userId)).withConverter(accountsConverter)

      const accountsSnap = await getDocs(q)
      const accounts = accountsSnap.docs.map((doc) => doc.data())
      return accounts
    },
  }
}

export const accountsFirestoreService = createAccountService(createFirestoreAccountsRepository())
