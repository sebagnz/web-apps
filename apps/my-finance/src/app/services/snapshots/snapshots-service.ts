import { AccountsRepository, Snapshot, SnapshotsRepository } from '@/domain'

import { TransactionManager } from '@/services'

export interface SnapshotsService {
  create: (snapshot: Omit<Snapshot, 'id'>) => Promise<void>
  update: (snapshot: Snapshot) => Promise<void>
  delete: (accountId: Snapshot['accountId'], snapshotId: Snapshot['id']) => Promise<void>
  get: (accountId: Snapshot['accountId'], snapshotId: Snapshot['id']) => Promise<Snapshot | undefined>
  getByAccounts: (accountIds: Array<Snapshot['accountId']>) => Promise<Snapshot[]>
}

export const createSnapshotsService = (
  snapshotsRepository: SnapshotsRepository,
  accountsRepository: AccountsRepository,
  transactionManager: TransactionManager<any>,
): SnapshotsService => {
  return {
    create: async (newSnapshot) => {
      await transactionManager.runTransaction(async () => {
        const account = await accountsRepository.get(newSnapshot.accountId)
        if (!account) throw new Error('Account not found')

        const snapshots = await snapshotsRepository.getByAccounts([newSnapshot.accountId])

        if (snapshots.length === 0) {
          await accountsRepository.update({ ...account, balance: newSnapshot.balance })
        }

        if (snapshots.length > 0 && snapshots[0].date < newSnapshot.date) {
          await accountsRepository.update({ ...account, balance: newSnapshot.balance })
        }

        await snapshotsRepository.create(newSnapshot)
      })
    },
    update: async (snapshot) => {
      await snapshotsRepository.update(snapshot)
    },
    delete: async (accountId, snapshotId) => {
      await transactionManager.runTransaction(async () => {
        const account = await accountsRepository.get(accountId)
        if (!account) throw new Error('Account not found')

        const snapshots = await snapshotsRepository.getByAccounts([accountId])
        if (!snapshots || snapshots.length === 0) throw new Error('Snapshots not found')

        const deleteIndex = snapshots.findIndex((snapshot) => snapshot.id === snapshotId)
        if (deleteIndex === -1) throw new Error('Snapshot not found')

        if (snapshots.length === 1) {
          await accountsRepository.update({ ...account, balance: 0 })
        }

        if (snapshots.length > 1 && deleteIndex === 0) {
          const nextSnapshot = snapshots[deleteIndex + 1]
          await accountsRepository.update({ ...account, balance: nextSnapshot.balance })
        }

        await snapshotsRepository.delete(accountId, snapshotId)
      })
    },
    get: async (accountId, id) => {
      return snapshotsRepository.get(accountId, id)
    },
    getByAccounts: async (accountIds) => {
      return snapshotsRepository.getByAccounts(accountIds)
    },
  }
}
