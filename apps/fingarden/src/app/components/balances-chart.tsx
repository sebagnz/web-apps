import { getShortDate } from '@/utils'

import { useAccounts } from '@/hooks/accounts'
import { useSavings } from '@/hooks/savings'

import { BarChart } from './bar-chart'

type ChartDataPoint = { x: string; y: number }

type Props = { dateFrom: Date; dateTo: Date; className?: string }

export const BalancesChart = ({ dateFrom, dateTo, className }: Props) => {
  const { accounts } = useAccounts()

  const accountIds = accounts.map(({ id }) => id)

  const { balancesByPeriod } = useSavings(accountIds, dateFrom, dateTo)

  const balancesByPeriodByAccount = Array.from(accountIds).reduce<Array<{ label: string; data: Array<ChartDataPoint> }>>((acc, accountId) => {
    const balanceDataPoints = Array.from(balancesByPeriod).map(([period, balances]) => {
      const balance = balances.find((balance) => balance.accountId === accountId)

      return { x: getShortDate(new Date(period)), y: balance?.balance || 0 }
    })

    acc.push({ label: accounts.find((acc) => acc.id === accountId)?.name || '', data: balanceDataPoints })
    return acc
  }, [])

  return <BarChart datasets={balancesByPeriodByAccount} title="Balances by period" className={className} />
}
