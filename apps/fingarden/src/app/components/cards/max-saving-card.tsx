import { useDateRange } from '@/contexts/date-range'
import { ComponentPropsWithoutRef, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

import { useSavings } from '@/hooks/savings'

import { Balance } from '@/components/balance'
import { Card } from '@/components/card'

import { getLongDate } from '../../utils/date'

type CardProps = ComponentPropsWithoutRef<typeof Card>

export const MaxSavingCard = ({ className, ...rest }: CardProps) => {
  const { range } = useDateRange()

  const { savingsByPeriod } = useSavings(range.dateFrom, range.dateTo)

  const maxSaving = useMemo(
    () =>
      savingsByPeriod.reduce((max, saving) => {
        return saving.value > max.value ? saving : max
      }, savingsByPeriod[0]),
    [savingsByPeriod],
  )

  if (!maxSaving) {
    return (
      <Card className={twMerge('pb-8 flex flex-col items-center justify-center text-center text-muted italic', className)} {...rest}>
        <p className="text-lg">Not enough data to display the best saving period yet.</p>
      </Card>
    )
  }

  return (
    <Card className={twMerge('pb-8 flex flex-col items-center', className)} {...rest}>
      <p className="text-lg">Best saving period</p>
      <div className="my-auto text-center space-y-2">
        <Balance className="text-5xl">{maxSaving.value}</Balance>
        <p className="text-xl text-muted">{getLongDate(new Date(maxSaving.period))}</p>
      </div>
    </Card>
  )
}
