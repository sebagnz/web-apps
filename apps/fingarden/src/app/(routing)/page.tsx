import { Metadata } from 'next'

import { Landing } from '@/pages/landing'

export const metadata: Metadata = { title: 'FinGarden' }

export default function LandingPage() {
  return <Landing className="page-landing" />
}
