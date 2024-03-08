import { Account, AccountsRepository, User } from '@/domain'

export interface AccountsService {
  create: (account: Omit<Account, 'id'>) => Promise<void>
  update: (account: Account) => Promise<void>
  delete: (id: Account['id']) => Promise<void>
  get: (id: Account['id']) => Promise<Account | undefined>
  getByUser: (userId: User['id']) => Promise<Account[]>
}

export const createAccountsService = (repository: AccountsRepository): AccountsService => {
  return {
    create: async (account) => {
      return repository.create(account)
    },
    update: async (account) => {
      return repository.update(account)
    },
    delete: async (id) => {
      return repository.delete(id)
    },
    get: async (id) => {
      return repository.get(id)
    },
    getByUser: async (userId) => {
      return repository.getByUser(userId)
    },
  }
}
