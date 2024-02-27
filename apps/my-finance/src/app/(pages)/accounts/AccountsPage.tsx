'use client'

import clsx from 'clsx'
import Link from 'next/link'

import { PlusIcon, TrashCanIcon } from '@web-apps/ui'

import { useAccounts } from '@/hooks/accounts'

export default function AccountsPage() {
  const { accounts, error, isLoading, totalBalance, deleteAccount } = useAccounts()

  const handleDeleteAccountIntent = (id: string) => {
    const account = accounts.find((account) => account.id === id)

    if (!account) return

    const confirmIntent = window.confirm(`Are you sure you want to delete ${account.name} account?`)
    if (confirmIntent) deleteAccount(id)
  }

  if (isLoading) return <div>Loading...</div>

  if (error) return <p>{error.message}</p>

  return (
    <div className="px-4 lg:px-0 mx-auto max-w-2xl">
      <p className="text-center mt-4">
        <span className="block text-xl">Total balance</span>
        <span className="block text-5xl font-medium">€ {totalBalance}</span>
      </p>
      <div className="flex justify-between items-center mt-8 mb-4">
        <h1 className="text-xl">Accounts</h1>
        <Link aria-label="Create new account" className="hover:underline" href="/accounts/new">
          <PlusIcon hoverable />
        </Link>
      </div>
      <div className="backdrop-blur-sm bg-white/30 p-2 rounded-lg">
        <div className="flex flex-col gap-y-2">
          {accounts.map((account) => (
            <div
              className={clsx(
                'flex justify-between items-center',
                'rounded-md p-4',
                'bg-accent text-accent-content',
                'shadow-sm',
                'transition-shadow duration-300',
                'hover:shadow-md',
              )}
              key={account.id}
            >
              <div>
                <p className="text-xl">
                  {account.image} {account.name}
                </p>
                <p>€ {account.balance}</p>
              </div>
              <button aria-label={`Delete account ${account.name}`} onClick={() => handleDeleteAccountIntent(account.id)}>
                <TrashCanIcon hoverable className="text-accent-content/70" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
