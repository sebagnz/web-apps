import { getAuth } from 'firebase/auth'
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'

import { ACCOUNTS_FIRESTORE_COLLECTION_PATH, FirestoreConverer, getFirestoreDB } from '@/hooks/firebase'

import { Account, AccountSchema, AccountsRepository, User } from '@/domain'

const auth = getAuth()

const getUserId = () => {
  const userId = auth.currentUser?.uid
  if (!userId) throw new Error('User not authenticated')
  return userId
}

type DBAccount = Account & { userId: User['id'] }

const createAccountsConverter = (userId: User['id']): FirestoreConverer<DBAccount, Account> => ({
  toFirestore: (account) => ({ ...account, userId }),
  fromFirestore: (snapshot, options) => AccountSchema.parse({ id: snapshot.id, ...snapshot.data(options) }),
})

export const createFirestoreAccountsRepository = (): AccountsRepository => {
  const db = getFirestoreDB()

  return {
    create: async (account) => {
      const userId = getUserId()
      const converter = createAccountsConverter(userId)
      const accountsRef = collection(db, ACCOUNTS_FIRESTORE_COLLECTION_PATH)
      await setDoc(doc(accountsRef).withConverter(converter), account)
    },
    update: async (account) => {
      const { name, image } = account
      const accountRef = doc(db, ACCOUNTS_FIRESTORE_COLLECTION_PATH, account.id)
      await updateDoc(accountRef, { name, image })
    },
    delete: async (id) => {
      const accountRef = doc(db, ACCOUNTS_FIRESTORE_COLLECTION_PATH, id)
      await deleteDoc(accountRef)
    },
    get: async (id) => {
      const userId = getUserId()
      const converter = createAccountsConverter(userId)
      const accountRef = doc(db, ACCOUNTS_FIRESTORE_COLLECTION_PATH, id)
      const accountSnap = await getDoc(accountRef.withConverter(converter))
      const account = accountSnap.data()
      return account
    },
    getByUser: async (userId) => {
      const converter = createAccountsConverter(userId)
      const accountsRef = collection(db, ACCOUNTS_FIRESTORE_COLLECTION_PATH)

      const q = query(accountsRef.withConverter(converter), where('userId', '==', userId))

      const accountsSnap = await getDocs(q)
      const accounts = accountsSnap.docs.map((doc) => doc.data())
      return accounts
    },
  }
}
