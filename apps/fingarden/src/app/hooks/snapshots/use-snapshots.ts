import { useCallback, useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'
import useSWR, { preload, useSWRConfig } from 'swr'

import { ACCOUNTS_CACHE_KEY } from '@/hooks/accounts'
import { useAuth } from '@/hooks/auth'

import { Snapshot } from '@/domain'

import { SnapshotsService } from '@/services'

type UseSnapshotsOptions = { order?: 'asc' | 'desc' }

type AccountIds = Array<Snapshot['accountId']>

export const SNAPSHOTS_CACHE_KEY = 'snapshots'

const createCacheKey = (accountIds: AccountIds | null) => {
  return [SNAPSHOTS_CACHE_KEY].concat(...(accountIds || []))
}

export const createUsePrefetchSnapshots = (snapshotsService: SnapshotsService, options?: UseSnapshotsOptions) => () => {
  const order = options?.order || 'desc'

  const prefetchSnapshots = (accountIds: AccountIds) => {
    return preload(createCacheKey(accountIds), () => snapshotsService.getByAccounts(accountIds, { order }))
  }

  return { prefetchSnapshots }
}

export const createUseSnapshots = (snapshotsService: SnapshotsService) => (accountIds: AccountIds | null, options?: UseSnapshotsOptions) => {
  const order = options?.order || 'desc'

  const { mutate } = useSWRConfig()

  const { user, isLoading: isLoadingUser } = useAuth()

  const CACHE_KEY = user ? createCacheKey(accountIds) : null

  const mutateKeys = useCallback(
    (key: string[]): boolean => {
      if (!CACHE_KEY) return false
      if (!Array.isArray(key)) return false

      const [keyName, ...keyAccountIds] = key

      if (keyName !== SNAPSHOTS_CACHE_KEY) return false

      if (keyAccountIds.length === 0) return true
      if (keyAccountIds.some((keyElement) => CACHE_KEY.includes(keyElement))) return true

      return false
    },
    [CACHE_KEY],
  )

  const {
    data: snapshots,
    error,
    isLoading: isLoadingSnapshots,
  } = useSWR(CACHE_KEY, () => snapshotsService.getByAccounts(accountIds, { order }), {
    fallbackData: [],
    revalidateOnFocus: false,
    dedupingInterval: 1000 * 60,
    keepPreviousData: true,
  })

  useEffect(() => {
    console.log('snapshots :>> ', snapshots)
  }, [snapshots])

  useEffect(() => {
    if (error) toast.error(error.message)
  }, [error])

  const isLoading = useMemo(() => isLoadingUser || isLoadingSnapshots, [isLoadingUser, isLoadingSnapshots])

  const createSnapshot = async (accountId: Snapshot['accountId'], balance: Snapshot['balance'], date: Snapshot['date']) => {
    await mutate(mutateKeys, snapshotsService.create({ accountId, balance, date }))
    await mutate(ACCOUNTS_CACHE_KEY)
  }

  const updateSnapshot = async (snapshot: Snapshot) => {
    await mutate(mutateKeys, snapshotsService.update(snapshot), {
      optimisticData: snapshots.map((snap) => (snap.id === snap.id ? snapshot : snap)),
    })
    await mutate(ACCOUNTS_CACHE_KEY)
  }

  const deleteSnapshot = async (accountId: Snapshot['accountId'], snapshotId: Snapshot['id']) => {
    await mutate(mutateKeys, snapshotsService.delete(accountId, snapshotId), {
      optimisticData: snapshots.filter((snap) => snap.id !== snapshotId),
    })
    await mutate(ACCOUNTS_CACHE_KEY)
  }

  return {
    snapshots,
    error,
    isLoading,
    createSnapshot: useCallback(createSnapshot, [mutateKeys, mutate]),
    updateSnapshot: useCallback(updateSnapshot, [mutateKeys, mutate, snapshots]),
    deleteSnapshot: useCallback(deleteSnapshot, [mutateKeys, mutate, snapshots]),
  }
}
