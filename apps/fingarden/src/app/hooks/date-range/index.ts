import { useState } from 'react'
import { z } from 'zod'

export const RangeSchema = z.object({ dateFrom: z.date(), dateTo: z.date() })
export type Range = z.infer<typeof RangeSchema>

export const RangeKeySchema = z.union([z.literal('LAST_SIX_MONTHS'), z.literal('LAST_YEAR'), z.literal('YEAR_TO_DATE'), z.literal('ALL_TIME')])
export type RangeKey = z.infer<typeof RangeKeySchema>

export const RANGES: Record<RangeKey, Range> = {
  LAST_SIX_MONTHS: { dateFrom: new Date(new Date().getFullYear(), new Date().getMonth() - 8), dateTo: new Date() },
  LAST_YEAR: { dateFrom: new Date(new Date().getFullYear() - 1, new Date().getMonth() - 2), dateTo: new Date() },
  YEAR_TO_DATE: { dateFrom: new Date(new Date().getFullYear() - 1, 11), dateTo: new Date() },
  ALL_TIME: { dateFrom: new Date(2020, 0), dateTo: new Date() },
} as const

export const RANGE_LABELS: Record<RangeKey, string> = {
  LAST_SIX_MONTHS: 'Last 6 months',
  LAST_YEAR: 'Last year',
  YEAR_TO_DATE: 'Year to date',
  ALL_TIME: 'All time',
}

export const useDateRange = (defaultKey: RangeKey = 'LAST_YEAR') => {
  const [key, setKey] = useState<RangeKey>(defaultKey)

  const range = RANGES[key]

  const setRange = (key: RangeKey) => setKey(key)

  return { rangeKey: key, range, setRange }
}
