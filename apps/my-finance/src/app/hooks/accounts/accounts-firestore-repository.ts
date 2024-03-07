import { getAuth } from 'firebase/auth'
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'

import { FirestoreConverer, getFirestoreDB } from '@/hooks/firebase'

import { Account, AccountSchema, AccountsRepository } from '@/domain'

const ACCOUNTS_FIRESTORE_COLLECTION_PATH = 'accounts'

const auth = getAuth()

type DBAccount = Account & { userId: string }

const createAccountsConverter = (userId: string): FirestoreConverer<DBAccount, Account> => ({
  toFirestore: (account) => ({ ...account, userId }),
  fromFirestore: (snapshot, options) => AccountSchema.parse({ id: snapshot.id, ...snapshot.data(options) }),
})

class UnauthenticatedError extends Error {
  constructor() {
    super('User not authenticated')
  }
}

export const createFirestoreAccountsRepository = (): AccountsRepository => {
  const db = getFirestoreDB()

  return {
    create: async (account: Omit<Account, 'id'>) => {
      const userId = auth.currentUser?.uid
      if (!userId) throw new UnauthenticatedError()

      const converter = createAccountsConverter(userId)
      const accountsRef = collection(db, ACCOUNTS_FIRESTORE_COLLECTION_PATH).withConverter(converter)
      await setDoc(doc(accountsRef), account)
    },
    update: async (account: Account) => {
      const userId = auth.currentUser?.uid
      if (!userId) throw new UnauthenticatedError()

      const converter = createAccountsConverter(userId)
      const accountRef = doc(db, ACCOUNTS_FIRESTORE_COLLECTION_PATH, account.id).withConverter(converter)
      await updateDoc(accountRef, account)
    },
    delete: async (id: Account['id']) => {
      const userId = auth.currentUser?.uid
      if (!userId) throw new UnauthenticatedError()

      const converter = createAccountsConverter(userId)
      const accountRef = doc(db, ACCOUNTS_FIRESTORE_COLLECTION_PATH, id).withConverter(converter)
      await deleteDoc(accountRef)
    },
    getById: async (id: Account['id']) => {
      const userId = auth.currentUser?.uid
      if (!userId) throw new UnauthenticatedError()

      const converter = createAccountsConverter(userId)
      const accountRef = doc(db, ACCOUNTS_FIRESTORE_COLLECTION_PATH, id).withConverter(converter)
      const accountSnap = await getDoc(accountRef)
      const account = accountSnap.data()
      return account
    },
    getAll: async () => {
      const userId = auth.currentUser?.uid
      if (!userId) throw new UnauthenticatedError()

      const converter = createAccountsConverter(userId)
      const accountsRef = collection(db, ACCOUNTS_FIRESTORE_COLLECTION_PATH).withConverter(converter)

      const q = query(accountsRef, where('userId', '==', userId))

      const accountsSnap = await getDocs(q)
      const accounts = accountsSnap.docs.map((doc) => doc.data())
      return accounts
    },
  }
}
