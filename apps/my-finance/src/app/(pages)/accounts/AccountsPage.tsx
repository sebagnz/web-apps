'use client'

import Link from 'next/link'

import { PlusIcon, TrashCanIcon } from '@web-apps/ui'

import { useAccounts } from '@/hooks/accounts'

export default function AccountsPage() {
  const { accounts, error, isLoading, totalBalance, deleteAccount } = useAccounts()

  if (isLoading) return <div>Loading...</div>

  if (error) return <p>{error.message}</p>

  return (
    <div className="px-4 lg:px-0">
      <p className="text-center mt-4">
        <span className="block text-xl">Total balance</span>
        <span className="block text-5xl font-medium">€ {totalBalance}</span>
      </p>
      <div className="flex justify-between items-center my-4">
        <h1 className="text-xl">Accounts</h1>
        <Link aria-label="Create new account" className="hover:underline" href="/accounts/new">
          <PlusIcon hoverable />
        </Link>
      </div>
      <div>
        {accounts.map((account) => (
          <div className="flex justify-between items-center bg-accent hover:bg-accent-focus text-accent-content rounded-md p-4 my-2" key={account.id}>
            <div>
              <p className="text-xl">
                {account.image} {account.name}
              </p>
              <p>€ {account.balance}</p>
            </div>
            <button aria-label={`Delete account ${account.name}`} onClick={() => deleteAccount(account.id)}>
              <TrashCanIcon hoverable className="text-accent-content/70" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
