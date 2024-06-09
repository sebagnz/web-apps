import { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'
import useSWR, { useSWRConfig } from 'swr'

import { PreferencesService } from '@/services'

export const PREFERENCES_CACHE_KEY = 'preferences'

export const createUsePreferences = (preferencesService: PreferencesService) => () => {
  const { mutate } = useSWRConfig()

  const {
    data: preferences,
    error,
    isLoading,
  } = useSWR(PREFERENCES_CACHE_KEY, () => preferencesService.get(), {
    revalidateOnFocus: false,
    dedupingInterval: 1000 * 60 * 10,
    keepPreviousData: true,
  })

  useEffect(() => {
    if (error) toast.error(error.message)
  }, [error])

  const setHideBalances = async (hideBalances: boolean) => {
    await mutate(PREFERENCES_CACHE_KEY, preferencesService.set({ hideBalances }), {
      optimisticData: { ...preferences, hideBalances },
    })
  }

  return {
    preferences,
    error,
    isLoading,
    setHideBalances: useCallback(setHideBalances, [mutate, preferences]),
  }
}
