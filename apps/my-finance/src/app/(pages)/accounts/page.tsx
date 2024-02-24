'use client'

import { useEffect, useState } from 'react'

import { useAccounts } from '@/hooks/accounts'

// import type { Metadata } from 'next'

// export const metadata: Metadata = {
//   title: 'My Finance | Accounts',
//   description: 'Handle all your finance in one place',
// }

export default function Accounts() {
  const { accounts, totalBalance, fetchAccounts, createAccount, deleteAccount } = useAccounts()
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchAccounts().catch(setError)
  }, [fetchAccounts])

  const handleCreateAccountClick = () => {
    createAccount('Fake account', 100, 'https://via.placeholder.com/150')
  }

  const handleDeleteAccountClick = () => {
    const [firstAccount] = accounts
    if (!firstAccount) return
    deleteAccount(firstAccount.id)
  }

  if (error) {
    return (
      <div>
        <h1>Something went wrong</h1>
        <p>{error.message}</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Accounts 💸</h1>
      <h2>
        Total balance: <strong>{totalBalance}</strong>
      </h2>
      <div>
        {accounts.map((account) => (
          <div key={account.id}>{account.name}</div>
        ))}
      </div>
      <button className="my-4 block bg-slate-300 rounded-sm border-slate-900" onClick={handleCreateAccountClick}>
        Create fake account
      </button>
      <button className="my-4 block bg-slate-300 rounded-sm border-slate-900" onClick={handleDeleteAccountClick}>
        Delete first account
      </button>
    </div>
  )
}
