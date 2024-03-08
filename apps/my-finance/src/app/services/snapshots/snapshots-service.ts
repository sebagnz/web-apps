import { Snapshot, SnapshotsRepository } from '@/domain'

export interface SnapshotsService {
  create: (snapshop: Omit<Snapshot, 'id' | 'date'>) => Promise<void>
  update: (snapshop: Snapshot) => Promise<void>
  delete: (accountId: Snapshot['accountId'], snapshotId: Snapshot['id']) => Promise<void>
  get: (accountId: Snapshot['accountId'], snapshotId: Snapshot['id']) => Promise<Snapshot | undefined>
  getByAccounts: (accountIds: Array<Snapshot['accountId']>) => Promise<Snapshot[]>
}

export const createSnapshotsService = (repository: SnapshotsRepository): SnapshotsService => {
  return {
    create: async (snapshop) => {
      return repository.create(snapshop)
    },
    update: async (snapshop) => {
      return repository.update(snapshop)
    },
    delete: async (accountId, id) => {
      return repository.delete(accountId, id)
    },
    get: async (accountId, id) => {
      return repository.get(accountId, id)
    },
    getByAccounts: async (accountIds) => {
      return repository.getByAccounts(accountIds)
    },
  }
}
