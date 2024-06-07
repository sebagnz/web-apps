import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { RANGES } from '@/hooks/date-range'
import { useSavings } from '@/hooks/savings'

import { Balance } from '@/components/balance'
import { Card } from '@/components/card'
import { SavingsLineChart } from '@/components/savings-chart'

type CardProps = ComponentPropsWithoutRef<typeof Card>

export const SavingsCard = ({ className, ...rest }: CardProps) => {
  const { totalSavings } = useSavings(null, RANGES.LAST_YEAR.dateFrom, RANGES.LAST_YEAR.dateTo)

  if (!totalSavings) {
    return (
      <Card className={twMerge('pb-8 flex flex-col items-center justify-center text-center text-muted italic', className)} {...rest}>
        <p className="text-lg">Not enough data to display the total savings yet.</p>
      </Card>
    )
  }

  return (
    <Card className={twMerge('p-6 pb-2 flex flex-col items-center gap-y-7', className)} {...rest}>
      <div className="text-center">
        <p className="text-lg">Last year savings</p>
        <Balance className="text-3xl font-medium">{totalSavings}</Balance>
      </div>
      <SavingsLineChart className="h-36" dateFrom={RANGES.LAST_YEAR.dateFrom} dateTo={RANGES.LAST_YEAR.dateTo} />
    </Card>
  )
}
