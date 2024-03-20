import { useCallback, useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'
import useSWR, { useSWRConfig } from 'swr'

import { useAuth } from '@/hooks/auth'

import { Account } from '@/domain'

import { AccountsService } from '@/services'

export const ACCOUNTS_CACHE_KEY = 'accounts'

export const createUseAccounts = (accountsService: AccountsService) => () => {
  const { mutate } = useSWRConfig()

  const { user, isLoading: isLoadingUser } = useAuth()

  const {
    data: accounts,
    error,
    isLoading: isLoadingAccounts,
  } = useSWR(user ? ACCOUNTS_CACHE_KEY : null, () => accountsService.getByUser(user!.id), {
    fallbackData: [],
    revalidateOnFocus: false,
  })

  useEffect(() => {
    if (error) toast.error(error.message)
  }, [error])

  const isLoading = useMemo(() => isLoadingUser || isLoadingAccounts, [isLoadingUser, isLoadingAccounts])

  const createAccount = async (name: Account['name'], balance: Account['balance'], image: Account['image']) => {
    return mutate(ACCOUNTS_CACHE_KEY, accountsService.create({ name, balance, image }))
  }

  const updateAccount = async (account: Account) => {
    return mutate(ACCOUNTS_CACHE_KEY, accountsService.update(account), {
      optimisticData: accounts.map((acc) => (acc.id === account.id ? account : acc)),
    })
  }

  const deleteAccount = async (id: Account['id']) => {
    return mutate(ACCOUNTS_CACHE_KEY, accountsService.delete(id), {
      optimisticData: accounts.filter((account) => account.id !== id),
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
