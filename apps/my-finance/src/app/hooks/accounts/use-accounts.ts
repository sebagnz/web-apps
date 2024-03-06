import { useCallback, useMemo } from 'react'
import useSWR, { useSWRConfig } from 'swr'

import { Account } from '@/domain'

import { AccountsService } from '@/services'

const ACCOUNTS_KEY = 'accounts'

export const createUseAccounts = (accountsService: AccountsService) => () => {
  const { mutate } = useSWRConfig()

  const {
    data: accounts,
    error,
    isLoading,
  } = useSWR(ACCOUNTS_KEY, accountsService.getAll, {
    fallbackData: [],
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  })

  const createAccount = async (name: Account['name'], balance: Account['balance'], image: Account['image']) => {
    const createAndRevalidateAccounts = async () => {
      await accountsService.create({ name, balance, image })
      return accountsService.getAll()
    }

    return mutate(ACCOUNTS_KEY, createAndRevalidateAccounts)
  }

  const updateAccount = async (account: Account) => {
    const updateAndRevalidateAccounts = async () => {
      await accountsService.update(account)
      return accountsService.getAll()
    }

    return mutate(ACCOUNTS_KEY, updateAndRevalidateAccounts, {
      optimisticData: accounts.map((acc) => (acc.id === account.id ? account : acc)),
      rollbackOnError: true,
    })
  }

  const deleteAccount = async (id: Account['id']) => {
    const deleteAndRevalidateAccounts = async () => {
      await accountsService.delete(id)
      return accountsService.getAll()
    }

    return mutate(ACCOUNTS_KEY, deleteAndRevalidateAccounts, {
      optimisticData: accounts.filter((account) => account.id !== id),
      rollbackOnError: true,
    })
  }

  const totalBalance = useMemo(() => {
    return accounts.reduce((acc, account) => account.balance + acc, 0)
  }, [accounts])

  return {
    accounts,
    error,
    isLoading,
    totalBalance,
    createAccount: useCallback(createAccount, [mutate]),
    updateAccount: useCallback(updateAccount, [mutate, accounts]),
    deleteAccount: useCallback(deleteAccount, [mutate, accounts]),
  }
}
