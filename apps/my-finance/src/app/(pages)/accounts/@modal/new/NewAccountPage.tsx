'use client'

import { useRouter } from 'next/navigation'

import { useAccounts } from '@/hooks/accounts'

export default function Page() {
  const { back } = useRouter()
  const { createAccount } = useAccounts()

  const handleCreateAccountClick = async () => {
    const accountName = 'Santander (Esp)'
    const accountBalance = 1500
    const accountImage = 'https://via.placeholder.com/150'

    await createAccount(accountName, accountBalance, accountImage)
    back()
  }

  return (
    <div className="bg-white">
      <h1>New Account Form</h1>
      <button className="my-4 block bg-slate-300 rounded-sm border-slate-900" onClick={handleCreateAccountClick}>
        Create Account
      </button>
    </div>
  )
}
