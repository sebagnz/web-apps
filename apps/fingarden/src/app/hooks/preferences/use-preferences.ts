import { useCallback, useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'
import useSWR, { useSWRConfig } from 'swr'

import { useAuth } from '@/hooks/auth'

import { Preferences } from '@/domain'

import { PreferencesService } from '@/services'

export const PREFERENCES_CACHE_KEY = 'preferences'

export const createUsePreferences = (preferencesService: PreferencesService) => () => {
  const { mutate } = useSWRConfig()

  const { user, isLoading: isLoadingUser } = useAuth()

  const {
    data: preferences,
    error,
    isLoading: isLoadingPreferences,
  } = useSWR(user ? PREFERENCES_CACHE_KEY : null, () => preferencesService.get(), {
    revalidateOnFocus: false,
    dedupingInterval: 1000 * 60 * 10,
    keepPreviousData: true,
  })

  useEffect(() => {
    if (error) toast.error(error.message)
  }, [error])

  const isLoading = useMemo(() => isLoadingUser || isLoadingPreferences, [isLoadingUser, isLoadingPreferences])

  const setHideBalances = async (hideBalances: Preferences['hideBalances']) => {
    await mutate(PREFERENCES_CACHE_KEY, preferencesService.set({ hideBalances }), {
      optimisticData: { ...preferences, hideBalances },
    })
  }

  const setMainCurrency = async (mainCurrency: Preferences['mainCurrency']) => {
    await mutate(PREFERENCES_CACHE_KEY, preferencesService.set({ mainCurrency }), {
      optimisticData: { ...preferences, mainCurrency },
    })
  }

  return {
    preferences,
    error,
    isLoading,
    setHideBalances: useCallback(setHideBalances, [mutate, preferences]),
    setMainCurrency: useCallback(setMainCurrency, [mutate, preferences]),
  }
}
