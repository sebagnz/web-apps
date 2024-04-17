'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'

import { LabeledInput } from '@/components/labeled-input'

import { BalancesChart } from './components/balances-chart'
import { SavingsChart } from './components/savings-chart'

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

export default function SavingsPage({ className }: SavingPageProps) {
  const { register, control } = useForm<FormInput>({
    resolver: zodResolver(FormInputSchema),
    mode: 'onChange',
    defaultValues: { range: 'LAST_YEAR' },
  })

  const rangeKey = useWatch({ control, name: 'range' })

  const range = RANGE_FILTERS[rangeKey]

  return (
    <div className={clsx('spacing-y-3', className)}>
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
      <div className="space-y-10">
        <SavingsChart dateFrom={range.dateFrom} dateTo={range.dateTo} />
        <BalancesChart dateFrom={range.dateFrom} dateTo={range.dateTo} />
      </div>
    </div>
  )
}
