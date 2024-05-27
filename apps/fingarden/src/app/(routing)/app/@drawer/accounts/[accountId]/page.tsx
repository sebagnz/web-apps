import type { Metadata } from 'next'

import { Drawer } from '@/components/drawer'

import { AccountPage } from '@/pages/account'

export const metadata: Metadata = {
  title: 'FinGarden | Accounts',
  description: 'Handle all your finance in one place',
}

type AccountPageWrapperProps = { params: { accountId: string } }

export default function AccountPageWrapper({ params }: AccountPageWrapperProps) {
  return (
    <Drawer>
      <AccountPage accountId={params.accountId} />
    </Drawer>
  )
}
