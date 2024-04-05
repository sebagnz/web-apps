import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { createMockSnapshot } from '@/domain'

import { useSavings } from '.'

const accountId1 = 'account-1'
const accountId2 = 'account-2'

const snapshots = [
  // January
  createMockSnapshot({ accountId: accountId1, date: new Date('2024-01-20'), balance: 1000 }),
  // February
  createMockSnapshot({ accountId: accountId1, date: new Date('2024-02-05'), balance: 1000 }),
  createMockSnapshot({ accountId: accountId2, date: new Date('2024-02-10'), balance: 2000 }),
  // March
  createMockSnapshot({ accountId: accountId1, date: new Date('2024-03-05'), balance: 3000 }),
  createMockSnapshot({ accountId: accountId2, date: new Date('2024-03-10'), balance: 4000 }),
]

vi.mock('@/hooks/snapshots', () => ({ useSnapshots: () => ({ snapshots }) }))

describe('useSavings', () => {
  it('should return balances by period', () => {
    const accountIds = [accountId1, accountId2]

    /**
     * January -> April
     */
    const { result, rerender } = renderHook(({ dateFrom, dateTo }) => useSavings(accountIds, dateFrom, dateTo), {
      initialProps: { dateFrom: new Date('2024-01-01'), dateTo: new Date('2024-04-01') },
    })

    const expectedJanuaryToAprilBalances = new Map([
      ['Jan 24', 1000],
      ['Feb 24', 3000],
      ['Mar 24', 7000],
    ])

    expect(result.current.balancesByPeriod).toEqual(expectedJanuaryToAprilBalances)

    /**
     * January -> March
     */
    rerender({ dateFrom: new Date('2024-01-01'), dateTo: new Date('2024-03-01') })

    const expectedJanuaryToMarchBalances = new Map([
      ['Jan 24', 1000],
      ['Feb 24', 3000],
    ])

    expect(result.current.balancesByPeriod).toEqual(expectedJanuaryToMarchBalances)

    /**
     * February -> March
     */
    rerender({ dateFrom: new Date('2024-02-01'), dateTo: new Date('2024-03-01') })

    const expectedFebruaryToMarchBalances = new Map([['Feb 24', 3000]])

    expect(result.current.balancesByPeriod).toEqual(expectedFebruaryToMarchBalances)
  })

  it('should return savings by period', () => {
    const accountIds = [accountId1, accountId2]
    const dateFrom = new Date('2024-01-01')
    const dateTo = new Date('2024-04-01')

    const { result } = renderHook(() => useSavings(accountIds, dateFrom, dateTo))

    const expectedSavings = new Map([
      ['Feb 24', 2000],
      ['Mar 24', 4000],
    ])

    expect(result.current.savingsByPeriod).toEqual(expectedSavings)
  })

  it('should return total savings', () => {
    const accountIds = [accountId1, accountId2]
    const dateFrom = new Date('2024-01-01')
    const dateTo = new Date('2024-04-01')

    const { result } = renderHook(() => useSavings(accountIds, dateFrom, dateTo))

    expect(result.current.totalSavings).toBe(6000)
  })
})
