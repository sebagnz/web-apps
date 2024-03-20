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
    create: async (snapshot) => {
      await transactionManager.runTransaction(async () => {
        const account = await accountsRepository.get(snapshot.accountId)
        if (!account) throw new Error('Account not found')

        await snapshotsRepository.create(snapshot)
        await accountsRepository.update({ ...account, balance: snapshot.balance })
      })
    },
    update: async (snapshot) => {
      await snapshotsRepository.update(snapshot)
    },
    delete: async (accountId, id) => {
      await snapshotsRepository.delete(accountId, id)
    },
    get: async (accountId, id) => {
      return snapshotsRepository.get(accountId, id)
    },
    getByAccounts: async (accountIds) => {
      return snapshotsRepository.getByAccounts(accountIds)
    },
  }
}
