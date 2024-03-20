import { v4 as uuidv4 } from 'uuid'

import { Account } from './account'
import { AccountsRepository } from './accounts-repository'

export const createMockAccount: (override?: Partial<Account>) => Account = (override = {}) => {
  return { id: uuidv4(), name: 'Mock Account', balance: 1000, image: '🏦', userId: '123', ...override }
}

export const createMockAccountsRepository: () => AccountsRepository = () => {
  return {
    create: async (account) => createMockAccount(),
    update: async (account) => {},
    delete: async (id) => {},
    get: async (id) => createMockAccount({ id }),
    getByUser: async (userId) => [createMockAccount({ id: uuidv4() }), createMockAccount({ id: uuidv4() })],
  }
}
