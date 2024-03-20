import { Timestamp } from 'firebase/firestore'

import { FirestoreConverer } from '@/hooks/firebase'

import { Snapshot, SnapshotSchema, User } from '@/domain'

type DBSnapshot = Omit<Snapshot, 'id' | 'date'> & { userId: User['id']; date: Timestamp }

export const createSnapshotsConverter = (userId: User['id']): FirestoreConverer<DBSnapshot, Snapshot> => ({
  toFirestore: (snapshot) => {
    const { accountId, balance, date } = snapshot
    return { accountId, balance, userId, date: Timestamp.fromDate(date) }
  },
  fromFirestore: (snapshot, options) => {
    const { date, ...rest } = snapshot.data(options)
    return SnapshotSchema.parse({ id: snapshot.id, date: date.toDate(), ...rest })
  },
})
