import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Finance | Account details',
  description: 'Handle all your finance in one place',
}

type AccountPageProps = {
  params: {
    accountId: string
  }
}

export default function AccountPage({ params }: AccountPageProps) {
  return <div>Account {params.accountId}</div>
}
