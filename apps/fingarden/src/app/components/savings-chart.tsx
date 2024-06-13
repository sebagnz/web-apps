import { getShortDate } from '@/utils'
import { twMerge } from 'tailwind-merge'

import { useSavings } from '@/hooks/savings'

import { BarChart } from '@/components/charts/bar-chart'

import { LineChart } from './charts/line-chart'

type ChartDataPoint = { x: string; y: number }

type Props = { dateFrom: Date; dateTo: Date; className?: string }

export const SavingsChart = ({ dateFrom, dateTo, className }: Props) => {
  const { savingsByPeriod } = useSavings(dateFrom, dateTo)

  const label = 'Savings'
  const data: Array<ChartDataPoint> = savingsByPeriod.map(({ period, value }) => ({
    x: getShortDate(new Date(period)),
    y: value,
  }))

  return (
    <div className={twMerge('relative', className)}>
      <BarChart datasets={[{ label, data }]} title="Monthly savings" className={className} scales ticks grid />
    </div>
  )
}

export const SavingsLineChart = ({ dateFrom, dateTo, className }: Props) => {
  const { savingsByPeriod } = useSavings(dateFrom, dateTo)

  const label = 'Savings'
  const data: Array<ChartDataPoint> = savingsByPeriod.map(({ period, value }) => ({
    x: getShortDate(new Date(period)),
    y: value,
  }))

  return (
    <div className={twMerge('relative', className)}>
      <LineChart className="rounded-xl" datasets={[{ label, data }]} aspectRatio={21 / 9} fill="start" />
    </div>
  )
}
