import { Metadata } from 'next'

import { Page } from '@/components/page'

import { AccountPage } from './account-page'

export const metadata: Metadata = {
  title: 'FinGarden | Account details',
  description: 'Handle all your finance in one place',
}

type AccountPageWrapperProps = {
  params: { accountId: string }
}

export default function AccountPageWrapper({ params }: AccountPageWrapperProps) {
  return (
    <Page variant="app">
      <AccountPage accountId={params.accountId} />
    </Page>
  )
}
