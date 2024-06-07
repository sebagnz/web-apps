import { filterMap, getMonthFirstDay, groupArrayBy } from '@/utils'
import { useMemo } from 'react'

import { useSnapshots } from '@/hooks/snapshots'

import { Account, Snapshot, SnapshotList } from '@/domain'

type DataPoint = { period: number; value: number }

type AccountBalance = Pick<Snapshot, 'accountId' | 'balance'>

type BalancesByPeriod = Map<DataPoint['period'], Array<AccountBalance>>

type SnapshotsByPeriod = Map<DataPoint['period'], SnapshotList>

const groupSnapshotsByPeriod = (snapshots: SnapshotList): SnapshotsByPeriod => {
  return groupArrayBy(snapshots, (snapshot) => getMonthFirstDay(snapshot.date).getTime())
}

/**
 * Creates a Map where each key representes a period and the value is an
 * array containing the last balance of each account in that period
 * @param lastSnapshotByPeriod An array of snapshots containing only the last snapshot of each period
 * @returns An Map where each key representes a period and the value is an array of account balances
 */
const getBalancesByPeriod = (snapshotsByPeriod: SnapshotsByPeriod): BalancesByPeriod => {
  const allPeriods = Array.from(snapshotsByPeriod.keys())

  return allPeriods.reduce<BalancesByPeriod>((map, period, periodIndex) => {
    const periodSnspshots = snapshotsByPeriod.get(period) || []
    const proyectedBalances = map.get(period) || []

    const filteredProyectedBalances = proyectedBalances.filter((balance) => {
      return !periodSnspshots.some((snapshot) => snapshot.accountId === balance.accountId)
    })

    const lastSnapshotsInPeriod = periodSnspshots.filter((snapshot, i, arr) => {
      return arr.findLastIndex(({ accountId }) => accountId === snapshot.accountId) === i
    })

    const realBalances = lastSnapshotsInPeriod.map(({ accountId, balance }) => ({ accountId, balance }))

    const mergedBalances = [...filteredProyectedBalances, ...realBalances]

    map.set(period, mergedBalances)

    const nextPeriod = allPeriods[periodIndex + 1]

    if (nextPeriod) map.set(nextPeriod, mergedBalances)

    return map
  }, new Map())
}

const filterBalancesByPeriod = (balancesByPeriod: BalancesByPeriod, dateFrom: Date, dateTo: Date) => {
  return filterMap(balancesByPeriod, (period) => period >= dateFrom.getTime() && period <= dateTo.getTime())
}

/**
 * Given a Map of balances by period, creates an array of data points where each point represents the total balance of all accounts in that period
 * @param balancesByPeriod The balances by period to be used
 * @returns An array of data points
 */
const createTotalBalanceByPeriod = (balancesByPeriod: BalancesByPeriod): Array<DataPoint> => {
  return Array.from(balancesByPeriod).map(([period, accountBalances]) => {
    const value = accountBalances.reduce((total, accountBalance) => total + accountBalance.balance, 0)
    return { period, value }
  })
}

/**
 * Given a Map of balances by period, creates an array of data points where each point represents the savings of that period
 * @param BalancesByPeriod The balances by period to be used
 * @returns An array of data points
 */
const createSavingsByPeriod = (BalancesByPeriod: BalancesByPeriod): Array<DataPoint> => {
  return Array.from(BalancesByPeriod).reduce<Array<DataPoint>>((acc, [period, accountBalances], i, arr) => {
    if (i === 0) return acc

    const [_, prevAccountBalances] = arr[i - 1]

    const periodBalance = accountBalances.reduce((total, accountBalance) => total + accountBalance.balance, 0)
    const prevPeriodBalance = prevAccountBalances.reduce((total, accountBalance) => total + accountBalance.balance, 0)

    return [...acc, { period, value: periodBalance - prevPeriodBalance }]
  }, [])
}

export const useSavings = (accountIds: Array<Account['id']> | null, dateFrom: Date, dateTo: Date) => {
  const { snapshots } = useSnapshots(accountIds, { order: 'asc' })

  const snapshotsByPediod = useMemo(() => groupSnapshotsByPeriod(snapshots), [snapshots])

  const allBalancesByPeriod = useMemo(() => getBalancesByPeriod(snapshotsByPediod), [snapshotsByPediod])

  const balancesByPeriod = useMemo(() => filterBalancesByPeriod(allBalancesByPeriod, dateFrom, dateTo), [allBalancesByPeriod, dateFrom, dateTo])

  const totalBalanceByPeriod = useMemo(() => createTotalBalanceByPeriod(balancesByPeriod), [balancesByPeriod])

  const savingsByPeriod = useMemo(() => createSavingsByPeriod(balancesByPeriod), [balancesByPeriod])

  const totalSavings = useMemo(() => savingsByPeriod.reduce((total, data) => total + data.value, 0), [savingsByPeriod])

  return { balancesByPeriod, totalBalanceByPeriod, savingsByPeriod, totalSavings }
}
