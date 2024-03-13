'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { Routes } from '@/routes'

import { PlusIcon, Skeleton, TrashCanIcon } from '@web-apps/ui'

import { useAccounts } from '@/hooks/accounts'
import '@/hooks/snapshots'

import { TranslucentCard } from '@/components/translucent-card'

import EmptyStateImg from '../../../../../public/empty-state.png'

export default function AccountsPage() {
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

  if (error) return <p>{error.message}</p>

  if (isLoading) {
    return (
      <div className="px-4 lg:px-0 mx-auto max-w-2xl">
        <div className="mt-4 flex flex-col items-center content-center gap-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-12 w-48" />
        </div>
        <div className="mt-8">
          <Skeleton className="h-4 w-32" />
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
      <div className="px-4 lg:px-0 mx-auto max-w-2xl">
        <div className="flex flex-col items-center gap-y-2 pb-2 px-2 text-content-secondary">
          <Image src={EmptyStateImg} alt="Empty state" height={100} />
          <p className="text-center">You don&apos;t have any accounts yet.</p>
          <p className="text-center text-sm">
            <Link className="underline" href={Routes.app.accounts.new}>
              Create a new one
            </Link>{' '}
            to start tracking your savings.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 sm:py-4">
      <p className="text-center">
        <span className="block text-xl">Total balance</span>
        <span className="block text-5xl font-medium">€ {totalBalance}</span>
      </p>

      <div className="flex flex-col gap-y-2 mt-4 sm:mt-8">
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

      <div className="w-fit mt-8 mx-auto">
        <Link
          className={clsx(
            'inline-flex border',
            'gap-x-2 p-2',
            'rounded-md',
            'border-control-accent text-control-accent-content',
            'hover:font-medium hover:shadow-md',
          )}
          aria-label="Create new account"
          href={Routes.app.accounts.new}
        >
          <PlusIcon />
          New account
        </Link>
      </div>
    </div>
  )
}
