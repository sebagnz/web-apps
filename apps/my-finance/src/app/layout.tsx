import clsx from 'clsx'
import { Sarabun } from 'next/font/google'

import { BaseHeader, BaseLayout } from '@web-apps/ui'

import { Account, AccountListSchema, AccountsRepository } from '@/domain'

import { createAccountService } from '@/services'

import './globals.css'

const font = Sarabun({ subsets: ['latin'], weight: ['200', '300', '400', '500', '600', '700', '800'] })

/**
 * Accounts Service
 */
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

const accountsService = createAccountService(createLocalStorageAccountsRepository())

/**
 * Root Layout
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <BaseLayout
          header={<BaseHeader className={clsx('py-2', 'justify-center', 'border-b border-x-slate-300')}>My Finances</BaseHeader>}
          leftSidebar={<div className="h-full flex flex-col justify-center items-center"></div>}
          main={<main>{children}</main>}
          rightSidebar={<div className="h-full flex flex-col justify-center items-center"></div>}
        />
      </body>
    </html>
  )
}
