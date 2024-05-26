import { Metadata } from 'next'

import { Page } from '@/components/page-component'

import { Landing } from '@/pages/landing'

export const metadata: Metadata = { title: 'FinGarden' }

export default function LandingPage() {
  return (
    <Page variant="landing">
      <Landing />
    </Page>
  )
}
