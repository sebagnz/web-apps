import { getShortDate } from '@/utils'

import { useAccounts } from '@/hooks/accounts'
import { useSavings } from '@/hooks/savings'

import { BarChart } from './bar-chart'

type ChartDataPoint = { x: string; y: number }

type SavingsChartProps = { dateFrom: Date; dateTo: Date }

export const SavingsChart = ({ dateFrom, dateTo }: SavingsChartProps) => {
  const { accounts } = useAccounts()

  const accountIds = accounts.map(({ id }) => id)

  const { savingsByPeriod, totalSavings } = useSavings(accountIds, dateFrom, dateTo)

  const label = 'Savings'
  const data: Array<ChartDataPoint> = savingsByPeriod.map(({ period, value }) => ({
    x: getShortDate(new Date(period)),
    y: value,
  }))

  return (
    <div className="mt-6 space-y-6 text-center text-content-secondary text-base">
      <div>
        <p>Total Savings</p>
        <p className="text-4xl font-medium">€ {totalSavings.toLocaleString()}</p>
      </div>
      <div>
        <p>Savings by ponth</p>
        <BarChart datasets={[{ label, data }]} />
      </div>
    </div>
  )
}
