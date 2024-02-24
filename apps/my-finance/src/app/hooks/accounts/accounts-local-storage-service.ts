import { Account, AccountListSchema, AccountsRepository } from '@/domain'

import { createAccountService } from '@/services'

const LOCALSTORAGE_NAMESPACE = 'my-finance'
const LOCALSTORAGE_ACCOUNTS_KEY = `${LOCALSTORAGE_NAMESPACE}:accounts`

const createLocalStorageAccountsRepository = (): AccountsRepository => {
  return {
    create: async (account: Account) => {
      const maybeAccountList = JSON.parse(localStorage.getItem(LOCALSTORAGE_ACCOUNTS_KEY) || '[]')
      const accountList = AccountListSchema.parse(maybeAccountList)

      const newAccountList = accountList.concat(account)
      localStorage.setItem(LOCALSTORAGE_ACCOUNTS_KEY, JSON.stringify(newAccountList))
      return account
    },
    update: async (account: Account) => {
      const maybeAccountList = JSON.parse(localStorage.getItem(LOCALSTORAGE_ACCOUNTS_KEY) || '[]')
      const accountList = AccountListSchema.parse(maybeAccountList)

      const newAccountList = accountList.map((a) => (a.id === account.id ? account : a))
      localStorage.setItem(LOCALSTORAGE_ACCOUNTS_KEY, JSON.stringify(newAccountList))
      return account
    },
    delete: async (id: Account['id']) => {
      const maybeAccountList = JSON.parse(localStorage.getItem(LOCALSTORAGE_ACCOUNTS_KEY) || '[]')
      const accountList = AccountListSchema.parse(maybeAccountList)

      const newAccountList = accountList.filter((a) => a.id !== id)
      localStorage.setItem(LOCALSTORAGE_ACCOUNTS_KEY, JSON.stringify(newAccountList))
    },
    getById: async (id: Account['id']) => {
      const maybeAccountList = JSON.parse(localStorage.getItem(LOCALSTORAGE_ACCOUNTS_KEY) || '[]')
      const accountList = AccountListSchema.parse(maybeAccountList)

      return accountList.find((a) => a.id === id)
    },
    getAll: async () => {
      const maybeAccountList = JSON.parse(localStorage.getItem(LOCALSTORAGE_ACCOUNTS_KEY) || '[]')
      const accountList = AccountListSchema.parse(maybeAccountList)
      return accountList
    },
  }
}

export const accountsLocalStorageService = createAccountService(createLocalStorageAccountsRepository())
