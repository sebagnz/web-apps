import type { Metadata } from 'next'

import { Drawer } from '@/components/drawer'

import { NewAccount } from '@/pages/new-account'

export const metadata: Metadata = { title: 'FinGarden | Create account' }

export default function Page() {
  return (
    <Drawer>
      <NewAccount />
    </Drawer>
  )
}
