import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { createMockAccount, createMockCurrencyRates, createMockSnapshot } from '@/domain'

import { useSavings } from '.'

const currencyRates = createMockCurrencyRates({ EUR: 1, USD: 1.25 })

vi.mock('@/hooks/currencies', () => ({ useCurrencies: () => ({ currencyRates }) }))

const account1 = createMockAccount({ id: 'account-1', currencyCode: 'EUR' })
const account2 = createMockAccount({ id: 'account-2', currencyCode: 'USD' })
const accounts = [account1, account2]

vi.mock('@/hooks/accounts', () => ({ useAccounts: () => ({ accounts }) }))

const January = new Date(2024, 0)
const February = new Date(2024, 1)
const March = new Date(2024, 2)
const April = new Date(2024, 3)

const snapshots = [
  // January
  createMockSnapshot({ accountId: account1.id, date: new Date(2024, 0, 20), balance: 1000 }),
  createMockSnapshot({ accountId: account2.id, date: new Date(2024, 0, 10), balance: 2000 }),
  // February
  createMockSnapshot({ accountId: account1.id, date: new Date(2024, 1, 5), balance: 2000 }),
  // March
  createMockSnapshot({ accountId: account1.id, date: new Date(2024, 2, 5), balance: 3000 }),
  createMockSnapshot({ accountId: account2.id, date: new Date(2024, 2, 10), balance: 4000 }),
]

vi.mock('@/hooks/snapshots', () => ({ useSnapshots: () => ({ snapshots }) }))

describe('useSavings', () => {
  it('should return balances by period', () => {
    const { result, rerender } = renderHook(({ dateFrom, dateTo }) => useSavings(dateFrom, dateTo), {
      initialProps: { dateFrom: January, dateTo: April },
    })

    const expectedJanuaryToAprilBalances = [
      { period: January.getTime(), value: 2600 },
      { period: February.getTime(), value: 3600 },
      { period: March.getTime(), value: 6200 },
    ]

    expect(result.current.totalBalanceByPeriod).toEqual(expectedJanuaryToAprilBalances)

    rerender({ dateFrom: January, dateTo: February })

    const expectedJanuaryToMarchBalances = [
      { period: January.getTime(), value: 2600 },
      { period: February.getTime(), value: 3600 },
    ]

    expect(result.current.totalBalanceByPeriod).toEqual(expectedJanuaryToMarchBalances)

    rerender({ dateFrom: February, dateTo: February })

    const expectedFebruaryToMarchBalances = [{ period: February.getTime(), value: 3600 }]

    expect(result.current.totalBalanceByPeriod).toEqual(expectedFebruaryToMarchBalances)
  })

  it('should return savings by period', () => {
    const dateFrom = January
    const dateTo = April

    const { result } = renderHook(() => useSavings(dateFrom, dateTo))

    const expectedSavings = [
      { period: February.getTime(), value: 1000 },
      { period: March.getTime(), value: 2600 },
    ]

    expect(result.current.savingsByPeriod).toEqual(expectedSavings)
  })

  it('should return total savings', () => {
    const dateFrom = January
    const dateTo = April

    const { result } = renderHook(() => useSavings(dateFrom, dateTo))

    expect(result.current.totalSavings).toBe(3600)
  })
})
