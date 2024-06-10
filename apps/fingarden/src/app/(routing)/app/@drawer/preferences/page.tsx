import type { Metadata } from 'next'

import { Drawer } from '@/components/drawer'

import { Preferences } from '@/pages/preferences'

export const metadata: Metadata = { title: 'FinGarden | Preferences' }

export default function Page() {
  return (
    <Drawer>
      <Preferences />
    </Drawer>
  )
}
