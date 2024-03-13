import { Metadata } from 'next'

import { AccountPage } from './account-page'

export const metadata: Metadata = {
  title: 'My Finance | Account details',
  description: 'Handle all your finance in one place',
}

type AccountPageWrapperProps = {
  params: { accountId: string }
}

export default function AccountPageWrapper({ params }: AccountPageWrapperProps) {
  return <AccountPage accountId={params.accountId} />
}
