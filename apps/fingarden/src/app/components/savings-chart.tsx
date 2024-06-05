import { getShortDate } from '@/utils'

import { useAccounts } from '@/hooks/accounts'
import { useSavings } from '@/hooks/savings'

import { BarChart } from '@/components/charts/bar-chart'

type ChartDataPoint = { x: string; y: number }

type Props = { dateFrom: Date; dateTo: Date; className?: string }

export const SavingsChart = ({ dateFrom, dateTo, className }: Props) => {
  const { accounts } = useAccounts()

  const accountIds = accounts.map(({ id }) => id)

  const { savingsByPeriod } = useSavings(accountIds, dateFrom, dateTo)

  const label = 'Savings'
  const data: Array<ChartDataPoint> = savingsByPeriod.map(({ period, value }) => ({
    x: getShortDate(new Date(period)),
    y: value,
  }))

  return <BarChart datasets={[{ label, data }]} title="Monthly savings" className={className} scales ticks grid />
}
