import type { Metadata } from 'next'

import { Analytics } from '@/pages/analytics'

export const metadata: Metadata = { title: 'FinGarden | Analytics' }

export default function PageWrapper() {
  return <Analytics className="page-app" />
}
