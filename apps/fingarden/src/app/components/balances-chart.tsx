import { getShortDate } from '@/utils'
import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { useAccounts } from '@/hooks/accounts'
import { useBalances } from '@/hooks/balances'
import { useSavings } from '@/hooks/savings'

import { BarChart } from '@/components/charts/bar-chart'

import { DataPoint } from './charts/chart'
import { LineChart } from './charts/line-chart'

type Props = { dateFrom: Date; dateTo: Date; className?: string }

export const BalancesChart = ({ dateFrom, dateTo, className }: Props) => {
  const { formatBalance, hideable } = useBalances()

  const { accounts } = useAccounts()

  const accountIds = accounts.map(({ id }) => id)

  const { balancesByPeriod } = useSavings(dateFrom, dateTo)

  const balancesByPeriodByAccount = Array.from(accountIds).reduce<Array<{ label: string; data: Array<DataPoint> }>>((acc, accountId) => {
    const balanceDataPoints = Array.from(balancesByPeriod).map(([period, balances]) => {
      const balance = balances.find((balance) => balance.accountId === accountId)

      return { x: getShortDate(new Date(period)), y: balance?.balance || 0 }
    })

    acc.push({ label: accounts.find((acc) => acc.id === accountId)?.name || '', data: balanceDataPoints })
    return acc
  }, [])

  const getTooltipFooter: ComponentPropsWithoutRef<typeof BarChart>['getTooltipFooter'] = (value) => hideable(formatBalance({ value }))

  const getYTicks: ComponentPropsWithoutRef<typeof BarChart>['getYTicks'] = (value) => hideable(formatBalance({ value, precision: 1, scale: 'k' }))

  return (
    <div className={twMerge('relative', className)}>
      <BarChart
        title="Balances by period"
        datasets={balancesByPeriodByAccount}
        getTooltipFooter={getTooltipFooter}
        getYTicks={getYTicks}
        stacked
        scales
        ticks
        grid
      />
    </div>
  )
}

export const TotalBalanceChart = ({ dateFrom, dateTo, className }: Props) => {
  const { totalBalanceByPeriod } = useSavings(dateFrom, dateTo)

  const label = 'Savings'
  const data: Array<DataPoint> = totalBalanceByPeriod.map(({ period, value }) => ({
    x: getShortDate(new Date(period)),
    y: value,
  }))

  return (
    <div className={twMerge('relative', className)}>
      <LineChart className="rounded-xl" datasets={[{ label, data }]} aspectRatio={21 / 9} fill />
    </div>
  )
}
