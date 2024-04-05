import { useMemo } from 'react'

import { useSnapshots } from '@/hooks/snapshots'

import { Account } from '@/domain'

type FinanceDataPoint = { period: string; balance: number }

type BalancesByPeriod = Map<FinanceDataPoint['period'], FinanceDataPoint['balance']>

type SavingsByPeriod = Map<FinanceDataPoint['period'], FinanceDataPoint['balance']>

export const useSavings = (accountIds: Array<Account['id']>, dateFrom: Date, dateTo: Date) => {
  const { snapshots: descSnapshots } = useSnapshots(accountIds)

  const descSnapshotsFiltered = useMemo(
    () => descSnapshots.filter((snapshot) => snapshot.date >= dateFrom && snapshot.date <= dateTo),
    [descSnapshots, dateFrom, dateTo],
  )

  // TODO: Make snapshots query sortable
  const snapshots = useMemo(() => descSnapshotsFiltered.sort((l, r) => l.date.getTime() - r.date.getTime()), [descSnapshotsFiltered])

  const balancesByPeriod = useMemo(
    () =>
      snapshots.reduce<BalancesByPeriod>((acc, snapshot) => {
        const period = snapshot.date.toLocaleDateString(undefined, { month: 'short', year: '2-digit' })

        if (acc.has(period)) acc.set(period, acc.get(period)! + snapshot.balance)
        else acc.set(period, snapshot.balance)

        return acc
      }, new Map()),
    [snapshots],
  )

  const savingsByPeriod: SavingsByPeriod = useMemo(
    () =>
      Array.from(balancesByPeriod).reduce((acc, [period, balance], index, array) => {
        if (index === 0) return acc

        const [previousPeriod, previousPeriodBalance] = array[index - 1]
        const saving = balance - previousPeriodBalance

        acc.set(period, saving)
        return acc
      }, new Map()),
    [balancesByPeriod],
  )

  const totalSavings = useMemo(() => Array.from(savingsByPeriod.values()).reduce((acc, saving) => acc + saving, 0), [savingsByPeriod])

  return { balancesByPeriod, savingsByPeriod, totalSavings }
}
