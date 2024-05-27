'use client'

import { useRouter } from 'next/navigation'

import { Routes } from '@/routes'

import { Drawer } from '@/components/drawer'

import { NewSnapshot } from '@/pages/new-snapshot'

type NewSnapshotPageProps = { params: { accountId: string } }

export default function Page({ params }: NewSnapshotPageProps) {
  const router = useRouter()

  return (
    <Drawer onClose={() => router.push(Routes.app.accounts.id(params.accountId))}>
      <NewSnapshot accountId={params.accountId} />
    </Drawer>
  )
}
