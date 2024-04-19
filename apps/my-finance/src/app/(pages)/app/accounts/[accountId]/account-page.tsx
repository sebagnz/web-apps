'use client'

import clsx from 'clsx'
import { Metadata } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { toast } from 'react-toastify'

import { Routes } from '@/routes'

import { PlusIcon, Skeleton, TrashCanIcon } from '@web-apps/ui'

import { useAccounts } from '@/hooks/accounts'
import { useSnapshots } from '@/hooks/snapshots'

import { Button } from '@/components/button'
import { TBody, TD, TH, THead, TR, Table } from '@/components/table'

export const metadata: Metadata = {
  title: 'My Finance | Account details',
  description: 'Handle all your finance in one place',
}

type AccountPageProps = {
  accountId: string
  className?: string
}

export const AccountPage = ({ accountId, className }: AccountPageProps) => {
  const router = useRouter()
  const { accounts, isLoading: isLoadingAccount, error: accountsError } = useAccounts()
  const { snapshots, isLoading: isLoadingSnapshots, error: snapshotsError, deleteSnapshot } = useSnapshots([accountId])

  const account = useMemo(() => accounts.find((account) => account.id === accountId), [accounts, accountId])

  const handleDeleteAccountIntent = async (id: string) => {
    const snapshot = snapshots.find((account) => account.id === id)

    if (!snapshot) return

    const confirmIntent = window.confirm(`Are you sure you want to delete this snapshot?`)

    if (!confirmIntent) return

    try {
      await deleteSnapshot(snapshot.accountId, snapshot.id)
    } catch (error) {
      if (error instanceof Error) toast.error(error.message)
    }
  }

  if (accountsError) {
    return (
      <div className={className}>
        <p>{accountsError.message}</p>
      </div>
    )
  }

  if (snapshotsError) {
    return (
      <div className={className}>
        <p>{snapshotsError.message}</p>
      </div>
    )
  }

  if (isLoadingAccount || isLoadingSnapshots) {
    return (
      <div className={className}>
        <div className="flex flex-col">
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="mt-4 flex flex-col items-center content-center gap-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-12 w-48" />
        </div>
        <div className="mt-4 flex flex-col items-center content-center">
          <Skeleton className="h-12 w-32 rounded-3xl" />
        </div>
        <div className="mt-4 flex flex-col gap-y-2">
          <Skeleton className="h-60" />
        </div>
      </div>
    )
  }

  if (!account) {
    return (
      <div className={className}>
        <p>Account not found</p>
        <button onClick={() => router.push(Routes.app.accounts.index)}>Go back</button>
      </div>
    )
  }

  if (snapshots.length === 0) {
    return (
      <div className={clsx('text-center', className)}>
        <p>You didn&apos;t create any snapshots yet.</p>
        <div className="mt-3 w-fit mx-auto">
          <Button as={Link} href={Routes.app.accounts.snapshots.new(account.id)} variant="outline" className="flex items-center gap-x-2">
            <PlusIcon />
            Add snapshot
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <p className="first-letter:flex items-center gap-x-1 text-sm">
        <Link className="hover:underline" href={Routes.app.accounts.index}>
          Accounts
        </Link>
        <span> / </span>
        <span className="text-muted">{account.name}</span>
      </p>

      <div className="mt-3 text-center">
        <p>Account balance</p>
        <p className="text-4xl font-medium">€ {account.balance}</p>
      </div>

      <div className="mt-6 w-fit mx-auto">
        <Button as={Link} href={Routes.app.accounts.snapshots.new(account.id)} variant="outline" className="flex items-center gap-x-2">
          <PlusIcon />
          Add snapshot
        </Button>
      </div>

      <Table className="my-3 w-full">
        <THead>
          <TR>
            <TH scope="col">Date</TH>
            <TH scope="col">Balance</TH>
            <TH scope="col" />
          </TR>
        </THead>
        <TBody>
          {snapshots.map((snapshot) => (
            <TR key={snapshot.id}>
              <TH scope="row">
                {snapshot.date.toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </TH>
              <TD>€ {snapshot.balance.toLocaleString()}</TD>
              <TD>
                <button onClick={() => handleDeleteAccountIntent(snapshot.id)}>
                  <TrashCanIcon className="w-4 h-4 text-muted hover:text-base" />
                </button>
              </TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </div>
  )
}
