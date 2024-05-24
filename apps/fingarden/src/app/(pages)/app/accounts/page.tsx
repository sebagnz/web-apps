import type { Metadata } from 'next'

import { Page } from '@/components/page'

import AccountsPage from './accounts-page'

export const metadata: Metadata = {
  title: 'FinGarden | Accounts',
  description: 'Handle all your finance in one place',
}

export default function AccountsPageWrapper() {
  return (
    <Page variant="app">
      <AccountsPage />
    </Page>
  )
}
