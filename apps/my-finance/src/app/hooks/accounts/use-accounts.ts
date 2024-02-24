import { useCallback, useMemo, useState } from 'react'

import { Account, AccountList } from '@/domain'

import { AccountsService } from '@/services'

export const createUseAccounts = (accountsService: AccountsService) => () => {
  const [accounts, setAccounts] = useState<AccountList>([])

  const fetchAccounts = async () => {
    console.log('Fetching accounts')
    const accounts = await accountsService.getAll()
    setAccounts(accounts)
  }

  const createAccount = async (name: Account['name'], balance: Account['balance'], image: Account['image']) => {
    await accountsService.create({ name, balance, image })
    await fetchAccounts()
  }

  const deleteAccount = async (id: Account['id']) => {
    console.log('Deleting account')
    await accountsService.delete(id)
    await fetchAccounts()
  }

  const totalBalance = useMemo(() => accounts.reduce((acc, account) => account.balance + acc, 0), [accounts])

  return {
    accounts,
    totalBalance,
    fetchAccounts: useCallback(fetchAccounts, []),
    createAccount: useCallback(createAccount, []),
    deleteAccount: useCallback(deleteAccount, []),
  }
}
