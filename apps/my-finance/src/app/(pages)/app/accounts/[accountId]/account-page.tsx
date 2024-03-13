'use client'

import { Metadata } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

import { Routes } from '@/routes'

import { useAccounts } from '@/hooks/accounts'

export const metadata: Metadata = {
  title: 'My Finance | Account details',
  description: 'Handle all your finance in one place',
}

type AccountPageProps = { accountId: string }

export const AccountPage = ({ accountId }: AccountPageProps) => {
  const router = useRouter()
  const { accounts, isLoading, error } = useAccounts()

  const account = useMemo(() => accounts.find((account) => account.id === accountId), [accounts, accountId])

  if (error) return <p>{error.message}</p>

  if (isLoading) return <p>Loading...</p>

  if (!account)
    return (
      <p>
        Account not found
        <button onClick={() => router.push(Routes.app.accounts.index)}>Go back</button>
      </p>
    )

  return (
    <div className="px-4 sm:py-4">
      <p className="flex items-center gap-x-1 text-sm">
        <Link className="text-control-accent-content hover:underline" href={Routes.app.accounts.index}>
          Accounts
        </Link>
        <span>/</span>
        <span>{account.name}</span>
      </p>

      <p className="text-3xl text-center mt-4">{account.name}</p>
      <p className="text-2xl text-center mt-4">€ {account.balance}</p>
    </div>
  )
}
