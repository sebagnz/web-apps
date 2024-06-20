import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { Routes } from '@/routes'

import { PlusIcon } from '@web-apps/ui'

import { Card } from '@/components/card'

type CardProps = ComponentPropsWithoutRef<typeof Card>

export const AddAccountCard = ({ className, ...rest }: CardProps) => {
  return (
    <Link href={Routes.app.accounts.new}>
      <div className={twMerge('p-6 text-center text-muted hover:text-base border border-base rounded-xl', className)} {...rest}>
        <div className="h-full flex flex-col items-center justify-center gap-y-1">
          <button>
            <PlusIcon />
          </button>
          <p>New account</p>
        </div>
      </div>
    </Link>
  )
}
