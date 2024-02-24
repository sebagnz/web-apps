import { v4 as uuidv4 } from 'uuid'

import { Account, AccountListSchema, AccountsRepository } from '@/domain'

export interface AccountsService {
  create: (account: Omit<Account, 'id'>) => Promise<Account>
  update: (account: Account) => Promise<Account>
  delete: (id: Account['id']) => Promise<void>
  getById: (id: Account['id']) => Promise<Account | undefined>
  getAll: () => Promise<Account[]>
}

export const createAccountService = (repository: AccountsRepository): AccountsService => {
  return {
    create: async (account: Omit<Account, 'id'>) => {
      const id = uuidv4()
      const newAccount = { ...account, id }
      return repository.create(newAccount)
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
