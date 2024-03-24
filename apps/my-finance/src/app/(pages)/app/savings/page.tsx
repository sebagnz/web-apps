import type { Metadata } from 'next'

import SavingsPage from './savings-page'

export const metadata: Metadata = {
  title: 'My Finance | Savings',
  description: 'Handle all your finance in one place',
}

export default function SavingsPageWrapper() {
  return <SavingsPage className="max-sm:px-4" />
}
