import { filterMap, getMonthFirstDay, groupArrayBy } from '@/utils'
import { useMemo } from 'react'

import { useSnapshots } from '@/hooks/snapshots'

import { Snapshot, SnapshotList } from '@/domain'

import { useAccounts } from '../accounts'
import { useCurrencies } from '../currencies'

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
const useAllBalancesByPeriod = (snapshotsByPeriod: SnapshotsByPeriod): BalancesByPeriod => {
  const { currencyRates } = useCurrencies()
  const { accounts } = useAccounts()

  const allPeriods = useMemo(() => Array.from(snapshotsByPeriod.keys()), [snapshotsByPeriod])

  const balancesByPeriod = useMemo<BalancesByPeriod>(() => {
    if (!currencyRates || !accounts) return new Map()

    /**
     * Traverse the periods array
     */
    return allPeriods.reduce<BalancesByPeriod>((map, period, periodIndex) => {
      /**
       * Grab all the snapshots in this period
       */
      const periodSnspshots = snapshotsByPeriod.get(period) || []

      /**
       * Grab all the proyected balances for this period.
       * Empty if this is the first iteration.
       */
      const proyectedBalances = map.get(period) || []

      /**
       * Remove the proyected balance if this account has snapshots in this period.
       */
      const accountProyectedBalances = proyectedBalances.filter((balance) => {
        return !periodSnspshots.some((snapshot) => snapshot.accountId === balance.accountId)
      })

      /**
       * Keep only the last snapshot of this period for each account
       */
      const lastSnapshotsInPeriod = periodSnspshots.filter((snapshot, i, arr) => {
        return arr.findLastIndex(({ accountId }) => accountId === snapshot.accountId) === i
      })

      /**
       * Build an array of balances using the last snapshot of each account for this period.
       */
      const realBalances = lastSnapshotsInPeriod.map(({ accountId, balance }) => {
        const account = accounts.find((account) => account.id === accountId)
        const rate = currencyRates[account!.currencyCode] || 1
        return { accountId, balance: balance / rate }
      })

      /**
       * Merge the proyected balances with the real ones.
       */
      const mergedBalances = [...accountProyectedBalances, ...realBalances]

      /**
       * Override the proyected balances with the new mix between real and proyected.
       */
      map.set(period, mergedBalances)

      /**
       * If there is a next period, Proyect the current values on it.
       */
      const nextPeriod = allPeriods[periodIndex + 1]
      if (nextPeriod) map.set(nextPeriod, mergedBalances)

      return map
    }, new Map())
  }, [accounts, currencyRates, snapshotsByPeriod, allPeriods])

  return balancesByPeriod
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

export const useSavings = (dateFrom: Date, dateTo: Date) => {
  const { snapshots } = useSnapshots(null, { order: 'asc' })

  const snapshotsByPediod = useMemo(() => groupSnapshotsByPeriod(snapshots), [snapshots])

  const allBalancesByPeriod = useAllBalancesByPeriod(snapshotsByPediod)

  const balancesByPeriod = useMemo(() => filterBalancesByPeriod(allBalancesByPeriod, dateFrom, dateTo), [allBalancesByPeriod, dateFrom, dateTo])

  const totalBalanceByPeriod = useMemo(() => createTotalBalanceByPeriod(balancesByPeriod), [balancesByPeriod])

  const savingsByPeriod = useMemo(() => createSavingsByPeriod(balancesByPeriod), [balancesByPeriod])

  const totalSavings = useMemo(() => savingsByPeriod.reduce((total, data) => total + data.value, 0), [savingsByPeriod])

  return { balancesByPeriod, totalBalanceByPeriod, savingsByPeriod, totalSavings }
}
