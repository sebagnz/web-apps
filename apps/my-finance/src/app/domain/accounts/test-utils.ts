import { v4 as uuidv4 } from 'uuid'

import { Account } from './account'
import { AccountsRepository } from './accounts-repository'

export const createMockAccount: (override: Partial<Account>) => Account = (override) => {
  return { id: uuidv4(), name: 'Mock Account', balance: 1000, image: '🏦', ...override }
}

export const createMockAccountsRepository: () => AccountsRepository = () => {
  return {
    create: async (account: Omit<Account, 'id'>) => {},
    update: async (account: Account) => {},
    delete: async (id: Account['id']) => {},
    getById: async (id: Account['id']) => createMockAccount({ id }),
    getAll: async () => [createMockAccount({ id: uuidv4() }), createMockAccount({ id: uuidv4() })],
  }
}
