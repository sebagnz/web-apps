import type { Metadata } from 'next'

import NewSnapshotPage from './new-snapshot-form'

export const metadata: Metadata = { title: 'My Finance | Create account' }

type NewSnapshotPageWrapperProps = {
  params: { accountId: string }
}

export default function NewSnapshotPageWrapper({ params }: NewSnapshotPageWrapperProps) {
  return <NewSnapshotPage accountId={params.accountId} />
}
