import { v4 as uuidv4 } from 'uuid'

import { Account, AccountListSchema, AccountsRepository } from '@/domain'

import { createAccountService } from '@/services'

const LOCALSTORAGE_NAMESPACE = 'my-finance'
const LOCALSTORAGE_ACCOUNTS_KEY = `${LOCALSTORAGE_NAMESPACE}:accounts`

function delay(minMs: number = 2000, maxMs: number = 3000) {
  const delayMs = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs
  return new Promise((res) => setTimeout(res, delayMs))
}

const createLocalStorageAccountsRepository = (): AccountsRepository => {
  return {
    create: async (account: Omit<Account, 'id'>) => {
      const id = uuidv4()
      const maybeAccountList = JSON.parse(localStorage.getItem(LOCALSTORAGE_ACCOUNTS_KEY) || '[]')
      const accountList = AccountListSchema.parse(maybeAccountList)

      const newAccount = { ...account, id }
      const newAccountList = accountList.concat(newAccount)
      localStorage.setItem(LOCALSTORAGE_ACCOUNTS_KEY, JSON.stringify(newAccountList))

      await delay()
    },
    update: async (account: Account) => {
      const maybeAccountList = JSON.parse(localStorage.getItem(LOCALSTORAGE_ACCOUNTS_KEY) || '[]')
      const accountList = AccountListSchema.parse(maybeAccountList)

      const newAccountList = accountList.map((a) => (a.id === account.id ? account : a))
      localStorage.setItem(LOCALSTORAGE_ACCOUNTS_KEY, JSON.stringify(newAccountList))

      await delay()
    },
    delete: async (id: Account['id']) => {
      const maybeAccountList = JSON.parse(localStorage.getItem(LOCALSTORAGE_ACCOUNTS_KEY) || '[]')
      const accountList = AccountListSchema.parse(maybeAccountList)

      const newAccountList = accountList.filter((a) => a.id !== id)
      localStorage.setItem(LOCALSTORAGE_ACCOUNTS_KEY, JSON.stringify(newAccountList))

      await delay()
    },
    getById: async (id: Account['id']) => {
      const maybeAccountList = JSON.parse(localStorage.getItem(LOCALSTORAGE_ACCOUNTS_KEY) || '[]')
      const accountList = AccountListSchema.parse(maybeAccountList)

      await delay()

      return accountList.find((a) => a.id === id)
    },
    getAll: async () => {
      const maybeAccountList = JSON.parse(localStorage.getItem(LOCALSTORAGE_ACCOUNTS_KEY) || '[]')
      const accountList = AccountListSchema.parse(maybeAccountList)

      await delay()

      return accountList
    },
  }
}

export const accountsLocalStorageService = createAccountService(createLocalStorageAccountsRepository())
