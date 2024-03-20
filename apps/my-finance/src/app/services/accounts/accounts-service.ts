import { Account, AccountsRepository, SnapshotsRepository, User } from '@/domain'

import { TransactionManager } from '@/services'

export interface AccountsService {
  create: (account: Omit<Account, 'id'>) => Promise<void>
  update: (account: Account) => Promise<void>
  delete: (id: Account['id']) => Promise<void>
  get: (id: Account['id']) => Promise<Account | undefined>
  getByUser: (userId: User['id']) => Promise<Account[]>
}

export const createAccountsService = (
  accountsRepository: AccountsRepository,
  snapshotsRepository: SnapshotsRepository,
  transactionManager: TransactionManager<any>,
): AccountsService => {
  return {
    create: async (account) => {
      await transactionManager.runTransaction(async () => {
        const newAccount = await accountsRepository.create(account)
        await snapshotsRepository.create({ accountId: newAccount.id, balance: newAccount.balance, date: new Date() })
      })
    },
    update: async (account) => {
      return accountsRepository.update(account)
    },
    delete: async (id) => {
      return accountsRepository.delete(id)
    },
    get: async (id) => {
      return accountsRepository.get(id)
    },
    getByUser: async (userId) => {
      return accountsRepository.getByUser(userId)
    },
  }
}
