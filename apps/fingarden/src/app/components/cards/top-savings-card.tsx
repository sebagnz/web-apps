import { useDateRange } from '@/contexts/date-range'
import { getShortDate } from '@/utils'
import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { useSavings } from '@/hooks/savings'

import { Balance } from '@/components/balance'
import { Card } from '@/components/card'

type CardProps = ComponentPropsWithoutRef<typeof Card>

export const TopSavingCard = ({ className, ...rest }: CardProps) => {
  const { range } = useDateRange()

  const { savingsByPeriod } = useSavings(range.dateFrom, range.dateTo)

  const [top1, top2, top3] = savingsByPeriod.sort((a, b) => (a.value < b.value ? -1 : 1))

  if (!top1) {
    return (
      <Card className={twMerge('p-6 pb-2 flex flex-col items-center justify-center text-center text-muted italic', className)} {...rest}>
        <p className="text-lg">Not enough data to display the top saving periods yet.</p>
      </Card>
    )
  }

  return (
    <Card className={twMerge('p-6 pb-2 min-w-max flex flex-col items-center gap-y-6', className)} {...rest}>
      <p className="text-lg text-center">Top savings</p>

      <div className="flex flex-col gap-y-4 justify-center items-end">
        {top1 ? (
          <div className="flex gap-x-2 items-center text-3xl">
            <Balance className="font-semibold">{top1.value}</Balance>
            <p className="text-sm">({getShortDate(new Date(top1.period))})</p>
          </div>
        ) : null}

        {top2 ? (
          <div className="flex gap-x-2 items-center text-2xl text-base/90">
            <Balance className="font-semibold">{top2.value}</Balance>
            <p className="text-sm">({getShortDate(new Date(top2.period))})</p>
          </div>
        ) : null}

        {top3 ? (
          <div className="flex gap-x-2 items-center text-lg text-base/80">
            <Balance className="font-semibold">{top3.value}</Balance>
            <p className="text-sm">({getShortDate(new Date(top3.period))})</p>
          </div>
        ) : null}
      </div>
    </Card>
  )
}
