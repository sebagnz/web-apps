import { getAuth } from 'firebase/auth'
import { Timestamp, collection, collectionGroup, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore'

import {
  ACCOUNTS_FIRESTORE_COLLECTION_PATH,
  FirestoreTransactionManager,
  SNAPSHOTS_FIRESTORE_COLLECTION_PATH,
  getFirestoreDB,
} from '@/hooks/firebase'

import { SnapshotsRepository } from '@/domain'

import { createSnapshotsConverter } from './snapshots-firestore-converter'

const auth = getAuth()

const getUserId = () => {
  const userId = auth.currentUser?.uid
  if (!userId) throw new Error('User not authenticated')
  return userId
}

export const createFirestoreSnapshotsRepository = (transactionManager: FirestoreTransactionManager): SnapshotsRepository => {
  const db = getFirestoreDB()

  return {
    create: async (snapshot) => {
      const userId = getUserId()
      const converter = createSnapshotsConverter(userId)
      const snapshotsRef = collection(db, ACCOUNTS_FIRESTORE_COLLECTION_PATH, snapshot.accountId, SNAPSHOTS_FIRESTORE_COLLECTION_PATH)
      const snapshotRef = doc(snapshotsRef).withConverter(converter)

      if (transactionManager.transaction) {
        transactionManager.transaction.set(snapshotRef, snapshot)
      } else {
        await setDoc(snapshotRef, snapshot)
      }
    },
    update: async (snapshot) => {
      const { balance, date } = snapshot
      const snapshotRef = doc(db, ACCOUNTS_FIRESTORE_COLLECTION_PATH, snapshot.accountId, SNAPSHOTS_FIRESTORE_COLLECTION_PATH, snapshot.id)

      if (transactionManager.transaction) {
        transactionManager.transaction.update(snapshotRef, { balance, date: Timestamp.fromDate(date) })
      } else {
        await updateDoc(snapshotRef, { balance, date: Timestamp.fromDate(date) })
      }
    },
    delete: async (accountId, snapshotId) => {
      const snapshotRef = doc(db, ACCOUNTS_FIRESTORE_COLLECTION_PATH, accountId, SNAPSHOTS_FIRESTORE_COLLECTION_PATH, snapshotId)

      if (transactionManager.transaction) {
        transactionManager.transaction.delete(snapshotRef)
      } else {
        await deleteDoc(snapshotRef)
      }
    },
    get: async (accountId, snapshotId) => {
      const userId = getUserId()
      const converter = createSnapshotsConverter(userId)
      const snapshotRef = doc(db, ACCOUNTS_FIRESTORE_COLLECTION_PATH, accountId, SNAPSHOTS_FIRESTORE_COLLECTION_PATH, snapshotId).withConverter(
        converter,
      )

      if (transactionManager.transaction) {
        const snapshotSnap = await transactionManager.transaction.get(snapshotRef)
        const snapshot = snapshotSnap.data()
        return snapshot
      } else {
        const snapshotSnap = await getDoc(snapshotRef)
        const snapshot = snapshotSnap.data()
        return snapshot
      }
    },
    getByAccounts: async (accountIds, options) => {
      const userId = getUserId()
      const converter = createSnapshotsConverter(userId)
      const snapshotsRef = collectionGroup(db, SNAPSHOTS_FIRESTORE_COLLECTION_PATH)

      const q = query(
        snapshotsRef.withConverter(converter),
        where('userId', '==', userId),
        where('accountId', 'in', accountIds),
        orderBy('date', options.order),
      )

      const snapshotsSnap = await getDocs(q)
      const snapshots = snapshotsSnap.docs.map((doc) => doc.data())
      return snapshots
    },
  }
}
