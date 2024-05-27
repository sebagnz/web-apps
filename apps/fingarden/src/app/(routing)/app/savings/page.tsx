import type { Metadata } from 'next'

import { Savings } from '@/pages/savings'

export const metadata: Metadata = {
  title: 'FinGarden | Savings',
  description: 'Handle all your finance in one place',
}

export default function SavingsPageWrapper() {
  return <Savings className="page-app" />
}
