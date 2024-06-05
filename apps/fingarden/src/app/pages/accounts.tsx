'use client'

import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { Routes } from '@/routes'

import { Skeleton } from '@web-apps/ui'

import { useAccounts } from '@/hooks/accounts'
import { RANGES } from '@/hooks/date-range'
import { usePrefetchSnapshots } from '@/hooks/snapshots'

import { Account } from '@/domain'

import { AccountCard, AddAccountCard } from '@/components/account-card'
import { Balance } from '@/components/balance'
import { Button } from '@/components/button'
import { SavingsChart } from '@/components/savings-chart'
import { TransitionLink } from '@/components/transition-link'

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
      <div className="mt-8 text-center">
        <p className="text-base">Total balance</p>
        <Balance className="text-4xl font-medium">{totalBalance}</Balance>
      </div>

      <AccountsGrid className="mt-12">
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} onMouseOver={handleAccountHover(account.id)} className="h-full" />
        ))}
        <AddAccountCard className="h-full" />
      </AccountsGrid>

      <div className="max-sm:hidden h-96 max-w-3xl mx-auto mt-20">
        <SavingsChart dateFrom={RANGES.LAST_YEAR.dateFrom} dateTo={RANGES.LAST_YEAR.dateTo} />
      </div>

      <div className="flex justify-center mt-10 mb-5">
        <Button as={TransitionLink} href={Routes.app.savings.index} variant="outline">
          View analytics
        </Button>
      </div>
    </div>
  )
}

const AccountsGrid = ({ className, ...rest }: ComponentPropsWithoutRef<'div'>) => (
  <div
    className={twMerge(
      'grid [grid-auto-rows:1fr] justify-between gap-4 sm:gap-8',
      'grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))]',
      'md:grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))]',
      'xl:grid-cols-[repeat(auto-fit,_minmax(330px,_1fr))]',
      className,
    )}
    {...rest}
  />
)
