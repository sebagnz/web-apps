import { Account } from './account'

export interface AccountsRepository {
  create: (account: Omit<Account, 'id'>) => Promise<void>
  update: (account: Account) => Promise<void>
  delete: (id: Account['id']) => Promise<void>
  get: (id: Account['id']) => Promise<Account | undefined>
  getByUser: (userId: string) => Promise<Account[]>
}
