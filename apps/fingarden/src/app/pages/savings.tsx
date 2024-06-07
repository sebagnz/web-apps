'use client'

import { ChangeEvent } from 'react'
import { twMerge } from 'tailwind-merge'

import { Skeleton } from '@web-apps/ui'

import { useAccounts } from '@/hooks/accounts'
import { RANGE_LABELS, RangeKeySchema, useDateRange } from '@/hooks/date-range'
import { useSavings } from '@/hooks/savings'
import { useSnapshots } from '@/hooks/snapshots'

import { Balance } from '@/components/balance'
import { BalancesChart } from '@/components/balances-chart'
import { LabeledInput } from '@/components/labeled-input'
import { SavingsChart } from '@/components/savings-chart'

type SavingPageProps = { className?: string }

export const Savings = ({ className }: SavingPageProps) => {
  const { rangeKey, range, setRange } = useDateRange()

  const { error: accountsError, isLoading: isLoadingAccounts } = useAccounts()

  const { error: snapshotsError, isLoading: isLoadingSnapshots } = useSnapshots(null, { order: 'asc' })

  const { totalSavings } = useSavings(null, range.dateFrom, range.dateTo)

  const handleRangeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRange(RangeKeySchema.parse(e.currentTarget.value))
  }

  if (accountsError || snapshotsError) {
    return (
      <div className={twMerge('spacing-y-3', className)}>
        {accountsError && <p>{accountsError.message}</p>}
        {snapshotsError && <p>{snapshotsError.message}</p>}
      </div>
    )
  }

  if (isLoadingAccounts || isLoadingSnapshots) {
    return (
      <div className={twMerge('space-y-8', className)}>
        {/* Select */}
        <Skeleton className="h-12 w-48 mx-auto" />

        {/* Total savings */}
        <div className="space-y-1 w-fit mx-auto">
          <Skeleton className="h-4 w-32 mx-auto" />
          <Skeleton className="h-12 w-48" />
        </div>

        {/* Charts */}
        <div className="space-y-10 max-w-2xl mx-auto">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 mx-auto" />
            <Skeleton className="w-full aspect-video" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 mx-auto" />
            <Skeleton className="w-full aspect-video" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={twMerge('space-y-3', className)}>
      <form>
        <LabeledInput className="w-fit mx-auto">
          <LabeledInput.Label htmlFor="range">Range</LabeledInput.Label>
          <LabeledInput.Select id="range" onChange={handleRangeChange} defaultValue={rangeKey}>
            {Object.entries(RANGE_LABELS).map(([key, label]) => (
              <LabeledInput.Option key={key} value={key}>
                {label}
              </LabeledInput.Option>
            ))}
          </LabeledInput.Select>
        </LabeledInput>
      </form>
      <div className="space-y-10 max-w-2xl mx-auto text-center">
        <div>
          <p>Total Savings</p>
          <Balance className="text-4xl font-medium">{totalSavings}</Balance>
        </div>
        <SavingsChart dateFrom={range.dateFrom} dateTo={range.dateTo} />
        <BalancesChart dateFrom={range.dateFrom} dateTo={range.dateTo} />
      </div>
    </div>
  )
}
