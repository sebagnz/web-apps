import type { Metadata } from 'next'

import { Modal } from '@/components/modal'

import { NewAccount } from '@/pages/new-account'

export const metadata: Metadata = { title: 'FinGarden | Create account' }

export default function Page() {
  return (
    <Modal>
      <NewAccount />
    </Modal>
  )
}
