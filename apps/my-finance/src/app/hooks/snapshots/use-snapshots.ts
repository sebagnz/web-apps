import { useCallback, useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'
import useSWR, { useSWRConfig } from 'swr'

import { ACCOUNTS_CACHE_KEY } from '@/hooks/accounts'
import { useAuth } from '@/hooks/auth'

import { Snapshot } from '@/domain'

import { SnapshotsService } from '@/services'

export const SNAPSHOTS_CACHE_KEY = 'snapshots'

export const createUseSnapshots = (snapshotsService: SnapshotsService) => (accountIds: Array<Snapshot['id']>) => {
  const { mutate } = useSWRConfig()

  const { user, isLoading: isLoadingUser } = useAuth()

  const {
    data: snapshots,
    error,
    isLoading: isLoadingSnapshots,
  } = useSWR(user ? SNAPSHOTS_CACHE_KEY : null, () => snapshotsService.getByAccounts(accountIds), {
    fallbackData: [],
    revalidateOnFocus: false,
  })

  useEffect(() => {
    if (error) toast.error(error.message)
  }, [error])

  const isLoading = useMemo(() => isLoadingUser || isLoadingSnapshots, [isLoadingUser, isLoadingSnapshots])

  const createSnapshot = async (accountId: Snapshot['accountId'], balance: Snapshot['balance'], date: Snapshot['date']) => {
    await mutate(SNAPSHOTS_CACHE_KEY, snapshotsService.create({ accountId, balance, date }))
    await mutate(ACCOUNTS_CACHE_KEY)
  }

  const updateSnapshot = async (snapshot: Snapshot) => {
    return mutate(SNAPSHOTS_CACHE_KEY, snapshotsService.update(snapshot), {
      optimisticData: snapshots.map((snap) => (snap.id === snap.id ? snapshot : snap)),
    })
  }

  const deleteSnapshot = async (accountId: Snapshot['accountId'], snapshotId: Snapshot['id']) => {
    return mutate(SNAPSHOTS_CACHE_KEY, snapshotsService.delete(accountId, snapshotId), {
      optimisticData: snapshots.filter((snap) => snap.id !== snapshotId),
    })
  }

  return {
    snapshots,
    error,
    isLoading,
    createSnapshot: useCallback(createSnapshot, [mutate]),
    updateSnapshot: useCallback(updateSnapshot, [mutate, snapshots]),
    deleteSnapshot: useCallback(deleteSnapshot, [mutate, snapshots]),
  }
}
