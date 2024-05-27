import type { Metadata } from 'next'

import { Accounts } from '@/pages/accounts'

export const metadata: Metadata = {
  title: 'FinGarden | Accounts',
  description: 'Handle all your finance in one place',
}

export default function Page() {
  return <Accounts className="page-app" />
}
