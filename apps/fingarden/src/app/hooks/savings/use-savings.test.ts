import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { createMockSnapshot } from '@/domain'

import { useSavings } from '.'

const accountId1 = 'account-1'
const accountId2 = 'account-2'

const January = new Date(2024, 0)
const February = new Date(2024, 1)
const March = new Date(2024, 2)
const April = new Date(2024, 3)

const snapshots = [
  // January
  createMockSnapshot({ accountId: accountId1, date: new Date(2024, 0, 20), balance: 1000 }),
  createMockSnapshot({ accountId: accountId2, date: new Date(2024, 0, 10), balance: 2000 }),
  // February
  createMockSnapshot({ accountId: accountId1, date: new Date(2024, 1, 5), balance: 2000 }),
  // March
  createMockSnapshot({ accountId: accountId1, date: new Date(2024, 2, 5), balance: 3000 }),
  createMockSnapshot({ accountId: accountId2, date: new Date(2024, 2, 10), balance: 4000 }),
]

vi.mock('@/hooks/snapshots', () => ({ useSnapshots: () => ({ snapshots }) }))

describe('useSavings', () => {
  it('should return balances by period', () => {
    const accountIds = [accountId1, accountId2]

    const { result, rerender } = renderHook(({ dateFrom, dateTo }) => useSavings(accountIds, dateFrom, dateTo), {
      initialProps: { dateFrom: January, dateTo: April },
    })

    const expectedJanuaryToAprilBalances = [
      { period: January.getTime(), value: 3000 },
      { period: February.getTime(), value: 4000 },
      { period: March.getTime(), value: 7000 },
    ]

    expect(result.current.totalBalanceByPeriod).toEqual(expectedJanuaryToAprilBalances)

    rerender({ dateFrom: January, dateTo: February })

    const expectedJanuaryToMarchBalances = [
      { period: January.getTime(), value: 3000 },
      { period: February.getTime(), value: 4000 },
    ]

    expect(result.current.totalBalanceByPeriod).toEqual(expectedJanuaryToMarchBalances)

    rerender({ dateFrom: February, dateTo: February })

    const expectedFebruaryToMarchBalances = [{ period: February.getTime(), value: 4000 }]

    expect(result.current.totalBalanceByPeriod).toEqual(expectedFebruaryToMarchBalances)
  })

  it('should return savings by period', () => {
    const accountIds = [accountId1, accountId2]
    const dateFrom = January
    const dateTo = April

    const { result } = renderHook(() => useSavings(accountIds, dateFrom, dateTo))

    const expectedSavings = [
      { period: February.getTime(), value: 1000 },
      { period: March.getTime(), value: 3000 },
    ]

    expect(result.current.savingsByPeriod).toEqual(expectedSavings)
  })

  it('should return total savings', () => {
    const accountIds = [accountId1, accountId2]
    const dateFrom = January
    const dateTo = April

    const { result } = renderHook(() => useSavings(accountIds, dateFrom, dateTo))

    expect(result.current.totalSavings).toBe(4000)
  })
})
