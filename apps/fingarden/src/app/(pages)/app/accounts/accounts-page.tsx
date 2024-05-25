'use client'

import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { Routes } from '@/routes'

import { PlusIcon, Skeleton } from '@web-apps/ui'

import { useAccounts } from '@/hooks/accounts'
import { usePrefetchSnapshots } from '@/hooks/snapshots'

import { Account } from '@/domain'

import { AccountCard, AddAccountCard } from '@/components/account-card'
import { Balance } from '@/components/balance'
import { Button } from '@/components/button'

type AccountPageProps = { className?: string }

export default function AccountsPage({ className }: AccountPageProps) {
  const { accounts, error, isLoading, totalBalance } = useAccounts()
  const { prefetchSnapshots } = usePrefetchSnapshots()

  const handleAccountHover = (id: Account['id']) => () => prefetchSnapshots([id])

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
        <AccountsGrid className="mt-8">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </AccountsGrid>
      </div>
    )
  }

  if (accounts.length === 0) {
    return (
      <div className={twMerge('text-center', className)}>
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
        <p className="text-base">Total balance</p>
        <Balance className="text-4xl font-medium">{totalBalance}</Balance>
      </div>

      <AccountsGrid className="mt-8">
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} onMouseOver={handleAccountHover(account.id)} className="h-full" />
        ))}
        <AddAccountCard className="h-full" />
      </AccountsGrid>
    </div>
  )
}

const AccountsGrid = ({ className, ...rest }: ComponentPropsWithoutRef<'div'>) => (
  <div
    className={twMerge('grid grid-cols-[repeat(auto-fill,_minmax(285px,_325px))] [grid-auto-rows:1fr] justify-center gap-4 sm:gap-8', className)}
    {...rest}
  />
)
