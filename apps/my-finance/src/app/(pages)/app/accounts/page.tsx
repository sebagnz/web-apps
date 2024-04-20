import type { Metadata } from 'next'

import AccountsPage from './accounts-page'

export const metadata: Metadata = {
  title: 'My Finance | Accounts',
  description: 'Handle all your finance in one place',
}

export default function AccountsPageWrapper() {
  return <AccountsPage className="max-sm:px-4 pb-4 max-w-2xl" />
}
