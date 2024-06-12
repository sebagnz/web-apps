import { useCallback, useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'
import useSWR, { useSWRConfig } from 'swr'

import { useAuth } from '@/hooks/auth'
import { useCurrencies } from '@/hooks/currencies'

import { Account } from '@/domain'

import { AccountsService } from '@/services'

export const ACCOUNTS_CACHE_KEY = 'accounts'

export const createUseAccounts = (accountsService: AccountsService) => () => {
  const { mutate } = useSWRConfig()

  const { user, isLoading: isLoadingUser } = useAuth()
  const { currencyRates, isLoadingCurrencyRates } = useCurrencies()

  const {
    data: accounts,
    error,
    isLoading: isLoadingAccounts,
  } = useSWR(user ? ACCOUNTS_CACHE_KEY : null, () => accountsService.getByUser(user!.id), {
    fallbackData: [],
    revalidateOnFocus: false,
    dedupingInterval: 1000 * 60,
  })

  useEffect(() => {
    if (error) toast.error(error.message)
  }, [error])

  const isLoading = useMemo(
    () => isLoadingUser || isLoadingAccounts || isLoadingCurrencyRates,
    [isLoadingUser, isLoadingAccounts, isLoadingCurrencyRates],
  )

  const createAccount = async (name: Account['name'], balance: Account['balance'], currencyCode: Account['currencyCode']) => {
    return mutate(ACCOUNTS_CACHE_KEY, accountsService.create({ name, balance, currencyCode }))
  }

  const updateAccount = async (account: Account) => {
    return mutate(ACCOUNTS_CACHE_KEY, accountsService.update(account), {
      optimisticData: accounts.map((acc) => (acc.id === account.id ? account : acc)),
    })
  }

  const deleteAccount = async (id: Account['id']) => {
    return mutate(ACCOUNTS_CACHE_KEY, accountsService.delete(id))
  }

  const totalBalance = useMemo(() => {
    if (!currencyRates) return null

    return accounts.reduce((acc, account) => {
      const rate = currencyRates[account.currencyCode]

      if (!rate) return acc

      return acc + account.balance / rate
    }, 0)
  }, [accounts, currencyRates])

  return {
    accounts,
    error,
    isLoading,
    totalBalance,
    createAccount: useCallback(createAccount, [mutate]),
    updateAccount: useCallback(updateAccount, [mutate, accounts]),
    deleteAccount: useCallback(deleteAccount, [mutate]),
  }
}
