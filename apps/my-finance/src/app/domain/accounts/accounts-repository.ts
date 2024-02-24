import { Account } from './account'

export interface AccountsRepository {
  create: (account: Account) => Promise<Account>
  update: (account: Account) => Promise<Account>
  delete: (id: Account['id']) => Promise<void>
  getById: (id: Account['id']) => Promise<Account | undefined>
  getAll: () => Promise<Account[]>
}
