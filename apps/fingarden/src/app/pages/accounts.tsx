'use client'

import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { Skeleton } from '@web-apps/ui'

import { useAccounts } from '@/hooks/accounts'
import { usePrefetchSnapshots } from '@/hooks/snapshots'

import { Account } from '@/domain'

import { AccountCard, AddAccountCard } from '@/components/account-card'
import { Balance } from '@/components/balance'

type AccountPageProps = { className?: string }

export const Accounts = ({ className }: AccountPageProps) => {
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
