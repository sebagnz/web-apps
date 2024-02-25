'use client'

import Link from 'next/link'

import { useAccounts } from '@/hooks/accounts'

export default function AccountsPage() {
  const { accounts, error, isLoading, totalBalance, deleteAccount } = useAccounts()

  const handleDeleteAccountClick = () => {
    const [firstAccount] = accounts
    if (!firstAccount) return
    deleteAccount(firstAccount.id)
  }

  if (isLoading) return <div>Loading...</div>

  if (error) return <p>{error.message}</p>

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
      <Link className="my-4 block bg-slate-300 rounded-sm border-slate-900" href="/accounts/new">
        Create new account
      </Link>
      <button className="my-4 block bg-slate-300 rounded-sm border-slate-900" onClick={handleDeleteAccountClick}>
        Delete first account
      </button>
    </div>
  )
}
