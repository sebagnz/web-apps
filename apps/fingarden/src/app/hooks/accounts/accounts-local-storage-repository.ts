import { v4 as uuidv4 } from 'uuid'

import { AccountListSchema, AccountsRepository } from '@/domain'

const LOCALSTORAGE_NAMESPACE = 'fingarden'
const LOCALSTORAGE_ACCOUNTS_KEY = `${LOCALSTORAGE_NAMESPACE}:accounts`

function delay(minMs: number = 200, maxMs: number = 600) {
  const delayMs = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs
  return new Promise((res) => setTimeout(res, delayMs))
}

export const createLocalStorageAccountsRepository = (): AccountsRepository => {
  return {
    create: async (account) => {
      const id = uuidv4()
      const maybeAccountList = JSON.parse(localStorage.getItem(LOCALSTORAGE_ACCOUNTS_KEY) || '[]')
      const accountList = AccountListSchema.parse(maybeAccountList)

      const newAccount = { ...account, id }
      const newAccountList = accountList.concat(newAccount)
      localStorage.setItem(LOCALSTORAGE_ACCOUNTS_KEY, JSON.stringify(newAccountList))

      await delay()

      return newAccount
    },
    update: async (account) => {
      const maybeAccountList = JSON.parse(localStorage.getItem(LOCALSTORAGE_ACCOUNTS_KEY) || '[]')
      const accountList = AccountListSchema.parse(maybeAccountList)

      const newAccountList = accountList.map((a) => (a.id === account.id ? account : a))
      localStorage.setItem(LOCALSTORAGE_ACCOUNTS_KEY, JSON.stringify(newAccountList))

      await delay()
    },
    delete: async (id) => {
      const maybeAccountList = JSON.parse(localStorage.getItem(LOCALSTORAGE_ACCOUNTS_KEY) || '[]')
      const accountList = AccountListSchema.parse(maybeAccountList)

      const newAccountList = accountList.filter((a) => a.id !== id)
      localStorage.setItem(LOCALSTORAGE_ACCOUNTS_KEY, JSON.stringify(newAccountList))

      await delay()
    },
    get: async (id) => {
      const maybeAccountList = JSON.parse(localStorage.getItem(LOCALSTORAGE_ACCOUNTS_KEY) || '[]')
      const accountList = AccountListSchema.parse(maybeAccountList)

      await delay()

      return accountList.find((a) => a.id === id)
    },
    getByUser: async (userId) => {
      const maybeAccountList = JSON.parse(localStorage.getItem(LOCALSTORAGE_ACCOUNTS_KEY) || '[]')
      const accountList = AccountListSchema.parse(maybeAccountList)

      await delay()

      return accountList
    },
  }
}
