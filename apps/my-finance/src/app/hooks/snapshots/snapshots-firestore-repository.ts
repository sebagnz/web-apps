import { getAuth } from 'firebase/auth'
import {
  Timestamp,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'

import { ACCOUNTS_FIRESTORE_COLLECTION_PATH, FirestoreConverer, SNAPSHOTS_FIRESTORE_COLLECTION_PATH, getFirestoreDB } from '@/hooks/firebase'

import { Snapshot, SnapshotSchema, SnapshotsRepository, User } from '@/domain'

const auth = getAuth()

const getUserId = () => {
  const userId = auth.currentUser?.uid
  if (!userId) throw new Error('User not authenticated')
  return userId
}

type DBSnapshot = Omit<Snapshot, 'id' | 'date'> & { userId: User['id']; date: Timestamp }

const createSnapshotsConverter = (userId: User['id']): FirestoreConverer<DBSnapshot, Snapshot> => ({
  toFirestore: (snapshot) => {
    const { accountId, balance } = snapshot
    const date = serverTimestamp() as Timestamp
    return { accountId, balance, userId, date }
  },
  fromFirestore: (snapshot, options) => {
    const { date, ...rest } = snapshot.data(options)
    return SnapshotSchema.parse({ id: snapshot.id, date: date.toDate(), ...rest })
  },
})

export const createFirestoreSnapshotsRepository = (): SnapshotsRepository => {
  const db = getFirestoreDB()

  return {
    create: async (snapshot) => {
      const userId = getUserId()
      const converter = createSnapshotsConverter(userId)
      const snapshotsRef = collection(db, ACCOUNTS_FIRESTORE_COLLECTION_PATH, snapshot.accountId, SNAPSHOTS_FIRESTORE_COLLECTION_PATH).withConverter(
        converter,
      )
      await setDoc(doc(snapshotsRef), snapshot)
    },
    update: async (snapshot) => {
      const { balance } = snapshot
      const snapshotRef = doc(db, ACCOUNTS_FIRESTORE_COLLECTION_PATH, snapshot.accountId, SNAPSHOTS_FIRESTORE_COLLECTION_PATH, snapshot.id)
      await updateDoc(snapshotRef, { balance })
    },
    delete: async (accountId, snapshotId) => {
      const snapshotRef = doc(db, ACCOUNTS_FIRESTORE_COLLECTION_PATH, accountId, SNAPSHOTS_FIRESTORE_COLLECTION_PATH, snapshotId)
      await deleteDoc(snapshotRef)
    },
    get: async (accountId, snapshotId) => {
      const userId = getUserId()
      const converter = createSnapshotsConverter(userId)
      const snapshotRef = doc(db, ACCOUNTS_FIRESTORE_COLLECTION_PATH, accountId, SNAPSHOTS_FIRESTORE_COLLECTION_PATH, snapshotId)
      const snapshotSnap = await getDoc(snapshotRef.withConverter(converter))
      const snapshot = snapshotSnap.data()
      return snapshot
    },
    getByAccounts: async (accountIds) => {
      const userId = getUserId()
      const converter = createSnapshotsConverter(userId)
      const snapshotsRef = collectionGroup(db, SNAPSHOTS_FIRESTORE_COLLECTION_PATH)

      const q = query(snapshotsRef.withConverter(converter), where('userId', '==', userId), where('accountId', 'in', accountIds))

      const snapshotsSnap = await getDocs(q)
      const snapshots = snapshotsSnap.docs.map((doc) => doc.data())
      return snapshots
    },
  }
}
