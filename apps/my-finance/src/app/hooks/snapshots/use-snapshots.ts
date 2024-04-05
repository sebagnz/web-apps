import { useCallback, useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'
import useSWR, { useSWRConfig } from 'swr'

import { ACCOUNTS_CACHE_KEY } from '@/hooks/accounts'
import { useAuth } from '@/hooks/auth'

import { Snapshot } from '@/domain'

import { SnapshotsService } from '@/services'

export const SNAPSHOTS_CACHE_KEY = 'snapshots'

export const createUseSnapshots = (snapshotsService: SnapshotsService) => (accountIds: Array<Snapshot['accountId']>) => {
  const { mutate } = useSWRConfig()

  const { user, isLoading: isLoadingUser } = useAuth()

  const ACCOUNT_SNAPSHOTS_CACHE_KEY = user && accountIds.length ? [SNAPSHOTS_CACHE_KEY].concat(accountIds) : null

  const {
    data: snapshots,
    error,
    isLoading: isLoadingSnapshots,
  } = useSWR(ACCOUNT_SNAPSHOTS_CACHE_KEY, () => snapshotsService.getByAccounts(accountIds), {
    fallbackData: [],
    revalidateOnFocus: false,
  })

  useEffect(() => {
    if (error) toast.error(error.message)
  }, [error])

  const isLoading = useMemo(() => isLoadingUser || isLoadingSnapshots, [isLoadingUser, isLoadingSnapshots])

  const createSnapshot = async (accountId: Snapshot['accountId'], balance: Snapshot['balance'], date: Snapshot['date']) => {
    await mutate(ACCOUNT_SNAPSHOTS_CACHE_KEY, snapshotsService.create({ accountId, balance, date }))
    await mutate(ACCOUNTS_CACHE_KEY)
  }

  const updateSnapshot = async (snapshot: Snapshot) => {
    await mutate(ACCOUNT_SNAPSHOTS_CACHE_KEY, snapshotsService.update(snapshot), {
      optimisticData: snapshots.map((snap) => (snap.id === snap.id ? snapshot : snap)),
    })
    await mutate(ACCOUNTS_CACHE_KEY)
  }

  const deleteSnapshot = async (accountId: Snapshot['accountId'], snapshotId: Snapshot['id']) => {
    await mutate(ACCOUNT_SNAPSHOTS_CACHE_KEY, snapshotsService.delete(accountId, snapshotId), {
      optimisticData: snapshots.filter((snap) => snap.id !== snapshotId),
    })
    await mutate(ACCOUNTS_CACHE_KEY)
  }

  return {
    snapshots,
    error,
    isLoading,
    createSnapshot: useCallback(createSnapshot, [ACCOUNT_SNAPSHOTS_CACHE_KEY, mutate]),
    updateSnapshot: useCallback(updateSnapshot, [ACCOUNT_SNAPSHOTS_CACHE_KEY, mutate, snapshots]),
    deleteSnapshot: useCallback(deleteSnapshot, [ACCOUNT_SNAPSHOTS_CACHE_KEY, mutate, snapshots]),
  }
}
