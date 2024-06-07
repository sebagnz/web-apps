import { getShortDate } from '@/utils'
import { twMerge } from 'tailwind-merge'

import { useAccounts } from '@/hooks/accounts'
import { useSavings } from '@/hooks/savings'

import { BarChart } from '@/components/charts/bar-chart'

import { LineChart } from './charts/line-chart'

type ChartDataPoint = { x: string; y: number }

type Props = { dateFrom: Date; dateTo: Date; className?: string }

export const BalancesChart = ({ dateFrom, dateTo, className }: Props) => {
  const { accounts } = useAccounts()

  const accountIds = accounts.map(({ id }) => id)

  const { balancesByPeriod } = useSavings(null, dateFrom, dateTo)

  const balancesByPeriodByAccount = Array.from(accountIds).reduce<Array<{ label: string; data: Array<ChartDataPoint> }>>((acc, accountId) => {
    const balanceDataPoints = Array.from(balancesByPeriod).map(([period, balances]) => {
      const balance = balances.find((balance) => balance.accountId === accountId)

      return { x: getShortDate(new Date(period)), y: balance?.balance || 0 }
    })

    acc.push({ label: accounts.find((acc) => acc.id === accountId)?.name || '', data: balanceDataPoints })
    return acc
  }, [])

  return (
    <div className={twMerge('relative', className)}>
      <BarChart datasets={balancesByPeriodByAccount} title="Balances by period" stacked scales ticks grid />
    </div>
  )
}

export const TotalBalanceChart = ({ dateFrom, dateTo, className }: Props) => {
  const { accounts } = useAccounts()

  const accountIds = accounts.map(({ id }) => id)

  const { totalBalanceByPeriod } = useSavings(accountIds, dateFrom, dateTo)

  const label = 'Savings'
  const data: Array<ChartDataPoint> = totalBalanceByPeriod.map(({ period, value }) => ({
    x: getShortDate(new Date(period)),
    y: value,
  }))

  return (
    <div className={twMerge('relative', className)}>
      <LineChart className="rounded-xl" datasets={[{ label, data }]} aspectRatio={21 / 9} fill />
    </div>
  )
}
