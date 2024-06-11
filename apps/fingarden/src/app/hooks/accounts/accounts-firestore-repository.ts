import { getAuth } from 'firebase/auth'
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'

import { ACCOUNTS_FIRESTORE_COLLECTION_PATH, FirestoreTransactionManager, getFirestoreDB } from '@/hooks/firebase'

import { AccountsRepository } from '@/domain'

import { createAccountsMapper } from './accounts-firestore-mapper'

const getUserId = () => {
  const auth = getAuth()
  const userId = auth.currentUser?.uid
  if (!userId) throw new Error('User not authenticated')
  return userId
}

export const createFirestoreAccountsRepository = (transactionManager: FirestoreTransactionManager): AccountsRepository => {
  const db = getFirestoreDB()

  return {
    create: async (account) => {
      const userId = getUserId()
      const converter = createAccountsMapper(userId)
      const accountsRef = collection(db, ACCOUNTS_FIRESTORE_COLLECTION_PATH)
      const accountRef = doc(accountsRef).withConverter(converter)

      if (transactionManager.transaction) {
        transactionManager.transaction.set(accountRef, account)
      } else {
        await setDoc(accountRef, account)
      }

      return { id: accountRef.id, ...account }
    },
    update: async (account) => {
      const { name, currencyCode, balance } = account
      const accountRef = doc(db, ACCOUNTS_FIRESTORE_COLLECTION_PATH, account.id)

      if (transactionManager.transaction) {
        transactionManager.transaction.update(accountRef, { name, currencyCode, balance })
      } else {
        await updateDoc(accountRef, { name, currencyCode, balance })
      }
    },
    delete: async (id) => {
      const accountRef = doc(db, ACCOUNTS_FIRESTORE_COLLECTION_PATH, id)

      if (transactionManager.transaction) {
        transactionManager.transaction.delete(accountRef)
      } else {
        await deleteDoc(accountRef)
      }
    },
    get: async (id) => {
      const userId = getUserId()
      const converter = createAccountsMapper(userId)
      const accountRef = doc(db, ACCOUNTS_FIRESTORE_COLLECTION_PATH, id).withConverter(converter)

      if (transactionManager.transaction) {
        const accountSnap = await transactionManager.transaction.get(accountRef)
        const account = accountSnap.data()
        return account
      } else {
        const accountSnap = await getDoc(accountRef)
        const account = accountSnap.data()
        return account
      }
    },
    getByUser: async (userId) => {
      const converter = createAccountsMapper(userId)
      const accountsRef = collection(db, ACCOUNTS_FIRESTORE_COLLECTION_PATH)

      const q = query(accountsRef.withConverter(converter), where('userId', '==', userId))

      const accountsSnap = await getDocs(q)
      const accounts = accountsSnap.docs.map((doc) => doc.data())
      return accounts
    },
  }
}
