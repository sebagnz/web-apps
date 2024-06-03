import { useAccounts } from '@/hooks/accounts'
import { useSavings } from '@/hooks/savings'

import { Balance } from '@/components/balance'

type Props = { dateFrom: Date; dateTo: Date; className?: string }

export const TotalSavings = ({ dateFrom, dateTo, className }: Props) => {
  const { accounts } = useAccounts()

  const accountIds = accounts.map(({ id }) => id)

  const { totalSavings } = useSavings(accountIds, dateFrom, dateTo)
  return (
    <div className={className}>
      <p>Total Savings</p>
      <Balance className="text-4xl font-medium">{totalSavings}</Balance>
    </div>
  )
}
