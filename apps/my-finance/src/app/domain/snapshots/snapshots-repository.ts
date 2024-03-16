import { Snapshot } from './snapshot'

export interface SnapshotsRepository {
  create: (snapshot: Omit<Snapshot, 'id'>) => Promise<void>
  update: (snapshot: Snapshot) => Promise<void>
  delete: (accountId: Snapshot['accountId'], snapshotId: Snapshot['id']) => Promise<void>
  get: (accountId: Snapshot['accountId'], snapshotId: Snapshot['id']) => Promise<Snapshot | undefined>
  getByAccounts: (accountIds: Array<Snapshot['accountId']>) => Promise<Snapshot[]>
}
