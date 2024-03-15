'use client'

import { Metadata } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

import { Routes } from '@/routes'

import { PlusIcon } from '@web-apps/ui'

import { useAccounts } from '@/hooks/accounts'
import { useSnapshots } from '@/hooks/snapshots'

import { Button } from '@/components/button'
import { TBody, TD, TH, THead, TR, Table } from '@/components/table'

export const metadata: Metadata = {
  title: 'My Finance | Account details',
  description: 'Handle all your finance in one place',
}

type AccountPageProps = { accountId: string }

export const AccountPage = ({ accountId }: AccountPageProps) => {
  const router = useRouter()
  const { accounts, isLoading: isLoadingAccount, error: accountsError } = useAccounts()
  const { snapshots, isLoading: isLoadingSnapshots, error: snapshotsError, createSnapshot } = useSnapshots([accountId])

  const account = useMemo(() => accounts.find((account) => account.id === accountId), [accounts, accountId])

  const handleCreateSnapshotClick = async () => {
    if (!account) return

    await createSnapshot(account?.id, 100)
  }

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

  if (!snapshots.length) {
    return (
      <div className="px-4 sm:py-4 m-auto text-center space-y-4 mt-8">
        <h2 className="text-xl">No snapshots</h2>
        <Button
          as={Link}
          href={Routes.app.accounts.snapshots.new(account.id)}
          variant="outline"
          className="inline-flex justify-center items-center gap-x-2 m-auto text-xs px-2 p-1"
        >
          <PlusIcon className="w-[14px] h-[14px]" />
          Add snapshot
        </Button>
      </div>
    )
  }

  return (
    <div className="px-4 sm:py-4 space-y-6">
      <p className="flex items-center gap-x-1 text-sm">
        <Link className="text-control-accent-content hover:underline" href={Routes.app.accounts.index}>
          Accounts
        </Link>
        <span>/</span>
        <span>{account.name}</span>
      </p>

      <div className="text-center">
        <p className="text-xs text-content-secondary">Current balance</p>
        <p className="text-4xl font-medium">€ {account.balance}</p>
      </div>

      <div className="space-y-3">
        <Button
          as={Link}
          href={Routes.app.accounts.snapshots.new(account.id)}
          variant="outline"
          className="flex justify-center items-center gap-x-2 m-auto text-xs px-2 p-1"
        >
          <PlusIcon className="w-[14px] h-[14px]" />
          Add snapshot
        </Button>

        <Table className="mx-auto w-full">
          <THead>
            <TR>
              <TH scope="col">Date</TH>
              <TH scope="col">Balance</TH>
            </TR>
          </THead>
          <TBody>
            {snapshots.map((snapshot) => (
              <TR key={snapshot.id}>
                <TH scope="row">{snapshot.date.toLocaleDateString()}</TH>
                <TD>€ {snapshot.balance}</TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </div>
    </div>
  )
}
