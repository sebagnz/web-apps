import { useDateRange } from '@/contexts/date-range'
import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { useAccounts } from '@/hooks/accounts'

import { Balance } from '@/components/balance'
import { TotalBalanceChart } from '@/components/balances-chart'
import { Card } from '@/components/card'

type CardProps = ComponentPropsWithoutRef<typeof Card>

export const BalanceCard = ({ className, ...rest }: CardProps) => {
  const { totalBalance, isLoading } = useAccounts()

  const { range } = useDateRange()

  if (isLoading) {
    return (
      <Card className={twMerge('pb-8 flex flex-col items-center justify-center text-center text-muted italic', className)} {...rest}>
        <p className="text-lg text-muted">Loading</p>
      </Card>
    )
  }

  if (!totalBalance) {
    return (
      <Card className={twMerge('pb-8 flex flex-col items-center justify-center text-center text-muted italic', className)} {...rest}>
        <p className="text-lg">Not enough data to display the total balance yet.</p>
      </Card>
    )
  }

  return (
    <Card className={twMerge('p-6 pb-2 flex flex-col items-center gap-y-7', className)} {...rest}>
      <div className="text-center">
        <p className="text-lg">Total balance</p>
        <Balance className="text-3xl font-medium">{totalBalance}</Balance>
      </div>
      <TotalBalanceChart className="h-36" dateFrom={range.dateFrom} dateTo={range.dateTo} />
    </Card>
  )
}
