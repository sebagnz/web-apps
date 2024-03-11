import { useCallback, useMemo } from 'react'
import useSWR, { useSWRConfig } from 'swr'

import { Account } from '@/domain'

import { AccountsService } from '@/services'

import { useAuth } from '../auth'

const ACCOUNTS_KEY = 'accounts'

export const createUseAccounts = (accountsService: AccountsService) => () => {
  const { mutate } = useSWRConfig()

  const { user, isLoading: isLoadingUser } = useAuth()

  const getAccountsByUser = useCallback(async () => {
    if (!user) throw new Error('You must be logged in to fetch accounts')
    return accountsService.getByUser(user.id)
  }, [user])

  const {
    data: accounts,
    error,
    isLoading: isLoadingAccounts,
  } = useSWR(user ? ACCOUNTS_KEY : null, getAccountsByUser, {
    fallbackData: [],
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  })

  const isLoading = useMemo(() => isLoadingUser || isLoadingAccounts, [isLoadingUser, isLoadingAccounts])

  const createAccount = async (name: Account['name'], balance: Account['balance'], image: Account['image']) => {
    const createAndRevalidateAccounts = async () => {
      await accountsService.create({ name, balance, image })
      return getAccountsByUser()
    }

    return mutate(ACCOUNTS_KEY, createAndRevalidateAccounts)
  }

  const updateAccount = async (account: Account) => {
    const updateAndRevalidateAccounts = async () => {
      await accountsService.update(account)
      return getAccountsByUser()
    }

    return mutate(ACCOUNTS_KEY, updateAndRevalidateAccounts, {
      optimisticData: accounts.map((acc) => (acc.id === account.id ? account : acc)),
      rollbackOnError: true,
    })
  }

  const deleteAccount = async (id: Account['id']) => {
    const deleteAndRevalidateAccounts = async () => {
      await accountsService.delete(id)
      return getAccountsByUser()
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
    createAccount: useCallback(createAccount, [mutate, getAccountsByUser]),
    updateAccount: useCallback(updateAccount, [mutate, accounts, getAccountsByUser]),
    deleteAccount: useCallback(deleteAccount, [mutate, accounts, getAccountsByUser]),
  }
}
