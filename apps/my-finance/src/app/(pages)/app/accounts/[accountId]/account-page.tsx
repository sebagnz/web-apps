'use client'

import { Metadata } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'

import { Routes } from '@/routes'

import { useAccounts } from '@/hooks/accounts'
import { useSnapshots } from '@/hooks/snapshots'

export const metadata: Metadata = {
  title: 'My Finance | Account details',
  description: 'Handle all your finance in one place',
}

type AccountPageProps = { accountId: string }

export const AccountPage = ({ accountId }: AccountPageProps) => {
  const router = useRouter()
  const { accounts, isLoading: isLoadingAccount, error: accountsError } = useAccounts()
  const { snapshots, isLoading: isLoadingSnapshots, error: snapshotsError } = useSnapshots([accountId])

  const account = useMemo(() => accounts.find((account) => account.id === accountId), [accounts, accountId])

  useEffect(() => {
    console.log('snapshots :>> ', snapshots)
  }, [snapshots])

  if (accountsError) return <p>{accountsError.message}</p>
  if (snapshotsError) return <p>{snapshotsError.message}</p>

  if (isLoadingAccount || isLoadingSnapshots) return <p>Loading...</p>

  if (!account) {
    return (
      <>
        <p>Account not found</p>
        <button onClick={() => router.push(Routes.app.accounts.index)}>Go back</button>
      </>
    )
  }

  if (!snapshots) return <p>No snapshots</p>

  return (
    <div className="px-4 sm:py-4">
      <p className="flex items-center gap-x-1 text-sm">
        <Link className="text-control-accent-content hover:underline" href={Routes.app.accounts.index}>
          Accounts
        </Link>
        <span>/</span>
        <span>{account.name}</span>
      </p>

      <p className="text-3xl text-center mt-4">Account</p>
      <p className="text-xl text-center mt-4">€ {account.balance}</p>
      <p className="text-xl text-center mt-4">{account.name}</p>

      <p className="text-3xl text-center mt-4">Snapshots</p>
      {snapshots.map((snapshot) => (
        <div key={snapshot.id}>
          <p className="text-xl text-center mt-4">{snapshot.date.toLocaleString()}</p>
          <p className="text-xl text-center mt-4">€ {snapshot.balance}</p>
        </div>
      ))}
    </div>
  )
}
