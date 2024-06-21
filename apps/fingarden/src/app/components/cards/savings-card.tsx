import { useDateRange } from '@/contexts/date-range'
import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { useSavings } from '@/hooks/savings'

import { Balance } from '@/components/balance'
import { Card } from '@/components/card'
import { SavingsLineChart } from '@/components/savings-chart'

type CardProps = ComponentPropsWithoutRef<typeof Card>

export const SavingsCard = ({ className, ...rest }: CardProps) => {
  const { range } = useDateRange()

  const { totalSavings } = useSavings(range.dateFrom, range.dateTo)

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
        <p className="text-lg">Total savings</p>
        <Balance className="text-3xl font-medium">{totalSavings}</Balance>
      </div>
      <SavingsLineChart className="h-36" dateFrom={range.dateFrom} dateTo={range.dateTo} />
    </Card>
  )
}
