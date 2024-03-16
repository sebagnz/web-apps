'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { toast } from 'react-toastify'

import { Routes } from '@/routes'

import { PlusIcon, Skeleton, TrashCanIcon } from '@web-apps/ui'

import { useAccounts } from '@/hooks/accounts'
import '@/hooks/snapshots'

import { Button } from '@/components/button'
import { TranslucentCard } from '@/components/translucent-card'

type AccountPageProps = {
  className?: string
}

export default function AccountsPage({ className }: AccountPageProps) {
  const { accounts, error, isLoading, totalBalance, deleteAccount } = useAccounts()

  const handleDeleteAccountIntent = async (id: string) => {
    const account = accounts.find((account) => account.id === id)

    if (!account) return

    const confirmIntent = window.confirm(`Are you sure you want to delete ${account.name} account?`)

    if (!confirmIntent) return

    try {
      await deleteAccount(id)
    } catch (error) {
      if (error instanceof Error) toast.error(error.message)
    }
  }

  if (error) {
    return (
      <div className={className}>
        <p>{error.message}</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={className}>
        <div className="flex flex-col items-center content-center gap-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-12 w-48" />
        </div>
        <div className="mt-4 flex flex-col items-center content-center">
          <Skeleton className="h-12 w-32 rounded-3xl" />
        </div>
        <div className="mt-4 flex flex-col gap-y-2">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
      </div>
    )
  }

  if (accounts.length === 0) {
    return (
      <div className={clsx('text-center text-content-secondary', className)}>
        <p>You don&apos;t have any accounts yet.</p>
        <div className="mt-3 w-fit mx-auto">
          <Button as={Link} href={Routes.app.accounts.new} variant="outline" className="flex items-center gap-x-2">
            <PlusIcon />
            New account
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="mt-3 text-center">
        <p className="text-base text-content-secondary">Total balance</p>
        <p className="text-4xl font-medium">€ {totalBalance}</p>
      </div>

      <div className="mt-6 w-fit mx-auto">
        <Button as={Link} href={Routes.app.accounts.new} variant="outline" className="flex items-center gap-x-2">
          <PlusIcon />
          New account
        </Button>
      </div>

      <div className="mt-3 flex flex-col gap-y-2 sm:mt-8">
        {accounts.map((account) => (
          <TranslucentCard key={account.id} className={clsx('flex justify-between items-center cursor-pointer')}>
            <Link className="flex flex-1 items-center gap-x-4" href={Routes.app.accounts.id(account.id)}>
              <p className="text-5xl">{account.image}</p>
              <div>
                <p className="text-xl">{account.name}</p>
                <p>€ {account.balance}</p>
              </div>
            </Link>
            <button aria-label={`Delete account ${account.name}`} onClick={() => handleDeleteAccountIntent(account.id)}>
              <TrashCanIcon hoverable className="text-content-tertiary" />
            </button>
          </TranslucentCard>
        ))}
      </div>
    </div>
  )
}
