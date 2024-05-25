import type { Metadata } from 'next'

import { Page } from '@/components/page-component'

import SavingsPage from './savings-page'

export const metadata: Metadata = {
  title: 'FinGarden | Savings',
  description: 'Handle all your finance in one place',
}

export default function SavingsPageWrapper() {
  return (
    <Page variant="app">
      <SavingsPage />
    </Page>
  )
}
