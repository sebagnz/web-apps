import { useCallback, useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'
import useSWR, { useSWRConfig } from 'swr'

import { Snapshot } from '@/domain'

import { SnapshotsService } from '@/services'

import { useAuth } from '../auth'

const SNAPSHOTS_KEY = 'snapshots'

export const createUseSnapshots = (snapshotsService: SnapshotsService) => (accountIds: Array<Snapshot['id']>) => {
  const { mutate } = useSWRConfig()

  const { user, isLoading: isLoadingUser } = useAuth()

  const getSnapshots = useCallback(async () => {
    if (!user) throw new Error('You must be logged in to fetch accounts')
    return snapshotsService.getByAccounts(accountIds)
  }, [user, accountIds])

  const {
    data: snapshots,
    error,
    isLoading: isLoadingSnapshots,
  } = useSWR(user ? SNAPSHOTS_KEY : null, getSnapshots, { fallbackData: [], shouldRetryOnError: false, revalidateOnFocus: false })

  useEffect(() => {
    if (error) toast.error(error.message)
  }, [error])

  const isLoading = useMemo(() => isLoadingUser || isLoadingSnapshots, [isLoadingUser, isLoadingSnapshots])

  const createAccount = async (accountId: Snapshot['accountId'], balance: Snapshot['balance']) => {
    const createAndRevalidateSnapshots = async () => {
      await snapshotsService.create({ accountId, balance })
      return getSnapshots()
    }

    return mutate(SNAPSHOTS_KEY, createAndRevalidateSnapshots)
  }

  const updateAccount = async (snapshot: Snapshot) => {
    const updateAndRevalidateSnapshots = async () => {
      await snapshotsService.update(snapshot)
      return getSnapshots()
    }

    return mutate(SNAPSHOTS_KEY, updateAndRevalidateSnapshots, {
      optimisticData: snapshots.map((snap) => (snap.id === snap.id ? snapshot : snap)),
      rollbackOnError: true,
    })
  }

  const deleteAccount = async (accountId: Snapshot['accountId'], snapshotId: Snapshot['id']) => {
    const deleteAndRevalidateSnapshots = async () => {
      await snapshotsService.delete(accountId, snapshotId)
      return getSnapshots()
    }

    return mutate(SNAPSHOTS_KEY, deleteAndRevalidateSnapshots, {
      optimisticData: snapshots.filter((snap) => snap.id !== snapshotId),
      rollbackOnError: true,
    })
  }

  return {
    snapshots,
    error,
    isLoading,
    createAccount: useCallback(createAccount, [mutate, getSnapshots]),
    updateAccount: useCallback(updateAccount, [mutate, snapshots, getSnapshots]),
    deleteAccount: useCallback(deleteAccount, [mutate, snapshots, getSnapshots]),
  }
}
