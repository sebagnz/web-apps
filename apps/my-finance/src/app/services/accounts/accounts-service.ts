import { Account, AccountsRepository } from '@/domain'

export interface AccountsService {
  create: (account: Omit<Account, 'id'>) => Promise<void>
  update: (account: Account) => Promise<void>
  delete: (id: Account['id']) => Promise<void>
  getById: (id: Account['id']) => Promise<Account | undefined>
  getAll: () => Promise<Account[]>
}

export const createAccountService = (repository: AccountsRepository): AccountsService => {
  return {
    create: async (account: Omit<Account, 'id'>) => {
      return repository.create(account)
    },
    update: async (account: Account) => {
      return repository.update(account)
    },
    delete: async (id: Account['id']) => {
      return repository.delete(id)
    },
    getById: async (id: Account['id']) => {
      return repository.getById(id)
    },
    getAll: async () => {
      return repository.getAll()
    },
  }
}
