import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { Routes } from '@/routes'

import { Account } from '@/domain'

import { Balance } from '@/components/balance'
import { Card } from '@/components/card'

type CardProps = ComponentPropsWithoutRef<typeof Card>

type AccountCardProps = { account: Account } & CardProps

export const AccountCard = ({ account, className, children, ...rest }: AccountCardProps) => {
  return (
    <Link href={Routes.app.accounts.id(account.id)}>
      <Card className={twMerge('transition-all active:scale-105 sm:hover:scale-105', className)} {...rest}>
        <div className="flex items-start justify-between gap-x-4">
          <div>
            <Balance className="text-lg font-semibold tracking-tighter">{account.balance}</Balance>
            <p className="text-sm">{account.name}</p>
          </div>
          <div>
            <p className="text-3xl">{account.image}</p>
          </div>
        </div>
      </Card>
    </Link>
  )
}
