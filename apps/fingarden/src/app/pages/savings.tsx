'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

import { Skeleton } from '@web-apps/ui'

import { useAccounts } from '@/hooks/accounts'
import { useSnapshots } from '@/hooks/snapshots'

import { BalancesChart } from '@/components/balances-chart'
import { LabeledInput } from '@/components/labeled-input'
import { SavingsChart } from '@/components/savings-chart'

type SavingPageProps = { className?: string }

const RangeSchema = z.object({
  dateFrom: z.date(),
  dateTo: z.date(),
})

const RangeFiltersSchema = z.object({
  LAST_SIX_MONTHS: RangeSchema,
  LAST_YEAR: RangeSchema,
  YEAR_TO_DATE: RangeSchema,
  ALL_TIME: RangeSchema,
})

type RangeFilters = z.infer<typeof RangeFiltersSchema>

const RANGE_FILTERS: RangeFilters = {
  LAST_SIX_MONTHS: { dateFrom: new Date(new Date().getFullYear(), new Date().getMonth() - 8), dateTo: new Date() },
  LAST_YEAR: { dateFrom: new Date(new Date().getFullYear() - 1, new Date().getMonth() - 2), dateTo: new Date() },
  YEAR_TO_DATE: { dateFrom: new Date(new Date().getFullYear() - 1, 11), dateTo: new Date() },
  ALL_TIME: { dateFrom: new Date(2020, 0), dateTo: new Date() },
} as const

const RANGE_FILTERS_LABELS: Record<keyof RangeFilters, string> = {
  LAST_SIX_MONTHS: 'Last 6 months',
  LAST_YEAR: 'Last year',
  YEAR_TO_DATE: 'Year to date',
  ALL_TIME: 'All time',
}

const FormInputSchema = z.object({
  range: RangeFiltersSchema.keyof(),
  account: z.string().optional(),
})

type FormInput = z.infer<typeof FormInputSchema>

export const Savings = ({ className }: SavingPageProps) => {
  const { error: accountsError, isLoading: isLoadingAccounts, accounts } = useAccounts()
  const accountIds = accounts.map(({ id }) => id)
  const { error: snapshotsError, isLoading: isLoadingSnapshots } = useSnapshots(accountIds, { order: 'asc' })

  const { register, control } = useForm<FormInput>({
    resolver: zodResolver(FormInputSchema),
    mode: 'onChange',
    defaultValues: { range: 'LAST_YEAR' },
  })

  const rangeKey = useWatch({ control, name: 'range' })

  const range = RANGE_FILTERS[rangeKey]

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
          <LabeledInput.Select id="range" {...register('range')}>
            {Object.entries(RANGE_FILTERS_LABELS).map(([key, label]) => (
              <LabeledInput.Option key={key} value={key}>
                {label}
              </LabeledInput.Option>
            ))}
          </LabeledInput.Select>
        </LabeledInput>
      </form>
      <div className="space-y-10 max-w-2xl mx-auto">
        <SavingsChart dateFrom={range.dateFrom} dateTo={range.dateTo} />
        <BalancesChart dateFrom={range.dateFrom} dateTo={range.dateTo} />
      </div>
    </div>
  )
}
