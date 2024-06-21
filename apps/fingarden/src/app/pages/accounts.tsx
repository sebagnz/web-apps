'use client'

import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { Routes } from '@/routes'

import { Skeleton } from '@web-apps/ui'

import { useAccounts } from '@/hooks/accounts'
import { usePrefetchSnapshots } from '@/hooks/snapshots'

import { Account } from '@/domain'

import { Button } from '@/components/button'
import { AccountCard } from '@/components/cards/account-card'
import { AddAccountCard } from '@/components/cards/add-account-card'
import { BalanceCard } from '@/components/cards/balance-card'
import { SavingsCard } from '@/components/cards/savings-card'
import { TopSavingCard } from '@/components/cards/top-savings-card'
import { TransitionLink } from '@/components/transition-link'

type Props = { className?: string }

export const Accounts = ({ className }: Props) => {
  const { accounts, error, isLoading } = useAccounts()
  const { prefetchSnapshots } = usePrefetchSnapshots()

  const handleAccountHover = (id: Account['id']) => () => prefetchSnapshots([id])

  if (error) return <Error className={className} error={error} />

  if (isLoading) return <Loading className={className} />

  return (
    <div className={className}>
      <h2 className="mt-6 text-center">Accounts</h2>

      <AccountsGrid className="mt-12">
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} onMouseOver={handleAccountHover(account.id)} className="h-full" />
        ))}
        <AddAccountCard className="h-full" />
      </AccountsGrid>

      <h2 className="mt-20 text-center">Summary</h2>

      <SummaryGrid className="mt-12">
        <BalanceCard className="flex-1" />
        <TopSavingCard className="flex-1" />
        <SavingsCard className="flex-1" />
      </SummaryGrid>

      <Button className="block w-fit mx-auto mt-10 mb-5" as={TransitionLink} href={Routes.app.analytics.index} variant="outline">
        View analytics
      </Button>
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

const SummaryGrid = ({ className, ...rest }: ComponentPropsWithoutRef<'div'>) => (
  <div className={twMerge('flex gap-4 justify-center flex-wrap', className)} {...rest} />
)

const Loading = (props: ComponentPropsWithoutRef<'div'>) => (
  <div {...props}>
    <div className="mt-6 flex flex-col items-center content-center gap-y-2">
      <Skeleton className="h-12 w-48" />
    </div>

    <AccountsGrid className="mt-12">
      <Skeleton className="h-24" />
      <Skeleton className="h-24" />
      <Skeleton className="h-24" />
    </AccountsGrid>

    <div className="mt-20 flex flex-col items-center content-center gap-y-2">
      <Skeleton className="h-12 w-48" />
    </div>

    <div className="mt-12 flex gap-4 justify-center">
      <Skeleton className="h-56 w-80" />
      <Skeleton className="h-56 w-80" />
      <Skeleton className="h-56 w-80" />
    </div>

    <div className="mt-10 flex flex-col items-center content-center gap-y-2">
      <Skeleton className="h-12 w-32 rounded-3xl" />
    </div>
  </div>
)

const Error = ({ error, ...rest }: ComponentPropsWithoutRef<'div'> & { error: any }) => (
  <div {...rest}>
    <p>{error.message}</p>
  </div>
)
