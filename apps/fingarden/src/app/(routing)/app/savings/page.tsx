import type { Metadata } from 'next'

import { Page } from '@/components/page-component'

import { Savings } from '@/pages/savings'

export const metadata: Metadata = {
  title: 'FinGarden | Savings',
  description: 'Handle all your finance in one place',
}

export default function SavingsPageWrapper() {
  return (
    <Page variant="app">
      <Savings />
    </Page>
  )
}
