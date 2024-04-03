import { useAccounts } from '@/hooks/accounts'
import { useSavings } from '@/hooks/savings'

import { BarChart } from './bar-chart'

type SavingsChartProps = { dateFrom: Date; dateTo: Date }

export const Savings = ({ dateFrom, dateTo }: SavingsChartProps) => {
  const { accounts } = useAccounts()

  const accountIds = accounts.map(({ id }) => id)

  const { savingsByPeriod, totalSavings } = useSavings(accountIds, dateFrom, dateTo)

  const label = 'Savings'
  const data = Array.from(savingsByPeriod).map(([period, balance]) => ({ x: period, y: balance }))

  return (
    <div className="mt-12 space-y-6">
      <div className="text-center">
        <p className="text-base text-content-secondary">Savings</p>
        <p className="text-4xl font-medium">€ {totalSavings.toLocaleString()}</p>
      </div>
      <BarChart datasets={[{ label, data }]} />
    </div>
  )
}
