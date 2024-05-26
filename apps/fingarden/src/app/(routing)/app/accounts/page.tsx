import type { Metadata } from 'next'

import { Page } from '@/components/page-component'

import { Accounts } from '@/pages/accounts'

export const metadata: Metadata = {
  title: 'FinGarden | Accounts',
  description: 'Handle all your finance in one place',
}

export default function AccountsPageWrapper() {
  return (
    <Page variant="app">
      <Accounts />
    </Page>
  )
}
