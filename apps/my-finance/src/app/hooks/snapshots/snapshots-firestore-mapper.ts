import { Timestamp } from 'firebase/firestore'

import { FirestoreMapper } from '@/hooks/firebase'

import { Snapshot, SnapshotSchema, User } from '@/domain'

type DBSnapshot = Omit<Snapshot, 'id' | 'date'> & { userId: User['id']; date: Timestamp }

export const createSnapshotsMapper = (userId: User['id']): FirestoreMapper<DBSnapshot, Snapshot> => ({
  toFirestore: (snapshot) => {
    const { accountId, balance, date } = snapshot
    return { accountId, balance, userId, date: Timestamp.fromDate(date) }
  },
  fromFirestore: (snapshot, options) => {
    const { date, ...rest } = snapshot.data(options)
    return SnapshotSchema.parse({ id: snapshot.id, date: date.toDate(), ...rest })
  },
})
