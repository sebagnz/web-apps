import { getShortDate } from '@/utils'

import { useAccounts } from '@/hooks/accounts'
import { useSavings } from '@/hooks/savings'

import { BarChart } from './bar-chart'

type SavingsChartProps = { dateFrom: Date; dateTo: Date }

export const SavingsChart = ({ dateFrom, dateTo }: SavingsChartProps) => {
  const { accounts } = useAccounts()

  const accountIds = accounts.map(({ id }) => id)

  const { savingsByPeriod, totalSavings } = useSavings(accountIds, dateFrom, dateTo)

  const label = 'Savings'
  const data = savingsByPeriod.map(({ period, value }) => ({
    x: getShortDate(new Date(period)),
    y: value,
  }))

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-base text-content-secondary">Savings</p>
        <p className="text-4xl font-medium">€ {totalSavings.toLocaleString()}</p>
      </div>
      <BarChart datasets={[{ label, data }]} />
    </div>
  )
}
