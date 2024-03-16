'use client'

import clsx from 'clsx'
import { Metadata } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

import { Routes } from '@/routes'

import { PlusIcon, Skeleton } from '@web-apps/ui'

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
  const { snapshots, isLoading: isLoadingSnapshots, error: snapshotsError } = useSnapshots([accountId])

  const account = useMemo(() => accounts.find((account) => account.id === accountId), [accounts, accountId])

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
      <div className={clsx('text-center text-content-secondary', className)}>
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
        <Link className="text-control-accent-content hover:underline" href={Routes.app.accounts.index}>
          Accounts
        </Link>
        <span> / </span>
        <span>{account.name}</span>
      </p>

      <div className="mt-3 text-center">
        <p className="text-base text-content-secondary">Current balance</p>
        <p className="text-4xl font-medium">€ {account.balance}</p>
      </div>

      <div className="mt-6 w-fit mx-auto">
        <Button as={Link} href={Routes.app.accounts.snapshots.new(account.id)} variant="outline" className="flex items-center gap-x-2">
          <PlusIcon />
          Add snapshot
        </Button>
      </div>

      <Table className="mt-3 w-full">
        <THead>
          <TR>
            <TH scope="col">Date</TH>
            <TH scope="col">Balance</TH>
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
              <TD>€ {snapshot.balance}</TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </div>
  )
}
