import type { Metadata } from 'next'

import { Modal } from '@/components/modal'

import { Login } from '@/pages/login'

export const metadata: Metadata = { title: 'FinGarden | Log in' }

export default function Page() {
  return (
    <Modal>
      <Login />
    </Modal>
  )
}
