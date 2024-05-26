import type { Metadata } from 'next'

import { Modal } from '@/components/modal'

import { NewSnapshot } from '@/pages/new-snapshot'

export const metadata: Metadata = { title: 'FinGarden | Create account' }

type NewSnapshotPageProps = { params: { accountId: string } }

export default function Page({ params }: NewSnapshotPageProps) {
  return (
    <Modal>
      <NewSnapshot accountId={params.accountId} />
    </Modal>
  )
}
