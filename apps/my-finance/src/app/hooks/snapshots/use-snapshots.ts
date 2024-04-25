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

const createCacheKey = (accountIds: AccountIds) => [SNAPSHOTS_CACHE_KEY].concat(accountIds)

export const createUsePrefetchSnapshots = (snapshotsService: SnapshotsService, options?: UseSnapshotsOptions) => () => {
  const order = options?.order || 'desc'

  const prefetchSnapshots = (accountIds: AccountIds) => {
    return preload(createCacheKey(accountIds), () => snapshotsService.getByAccounts(accountIds, { order }))
  }

  return { prefetchSnapshots }
}

export const createUseSnapshots = (snapshotsService: SnapshotsService) => (accountIds: AccountIds, options?: UseSnapshotsOptions) => {
  const order = options?.order || 'desc'

  const { mutate } = useSWRConfig()

  const { user, isLoading: isLoadingUser } = useAuth()

  const CACHE_KEY = user && accountIds.length ? createCacheKey(accountIds) : null

  const {
    data: snapshots,
    error,
    isLoading: isLoadingSnapshots,
  } = useSWR(CACHE_KEY, () => snapshotsService.getByAccounts(accountIds, { order }), {
    fallbackData: [],
    revalidateOnFocus: false,
  })

  useEffect(() => {
    if (error) toast.error(error.message)
  }, [error])

  const isLoading = useMemo(() => isLoadingUser || isLoadingSnapshots, [isLoadingUser, isLoadingSnapshots])

  const createSnapshot = async (accountId: Snapshot['accountId'], balance: Snapshot['balance'], date: Snapshot['date']) => {
    await mutate(CACHE_KEY, snapshotsService.create({ accountId, balance, date }))
    await mutate(ACCOUNTS_CACHE_KEY)
  }

  const updateSnapshot = async (snapshot: Snapshot) => {
    await mutate(CACHE_KEY, snapshotsService.update(snapshot), {
      optimisticData: snapshots.map((snap) => (snap.id === snap.id ? snapshot : snap)),
    })
    await mutate(ACCOUNTS_CACHE_KEY)
  }

  const deleteSnapshot = async (accountId: Snapshot['accountId'], snapshotId: Snapshot['id']) => {
    await mutate(CACHE_KEY, snapshotsService.delete(accountId, snapshotId), {
      optimisticData: snapshots.filter((snap) => snap.id !== snapshotId),
    })
    await mutate(ACCOUNTS_CACHE_KEY)
  }

  return {
    snapshots,
    error,
    isLoading,
    createSnapshot: useCallback(createSnapshot, [CACHE_KEY, mutate]),
    updateSnapshot: useCallback(updateSnapshot, [CACHE_KEY, mutate, snapshots]),
    deleteSnapshot: useCallback(deleteSnapshot, [CACHE_KEY, mutate, snapshots]),
  }
}
