'use client'

import { Authenticated } from '@/app/components/Authentication'
import { usePathname, useRouter } from 'next/navigation'

import { Modal } from '@/components/modal'

type AccountsLayoutProps = {
  children: React.ReactNode
  modal?: React.ReactNode
}

export default function AccountsLayout({ children, modal }: AccountsLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Authenticated redirectToLogin fallback={<div>Checking authentication...</div>}>
      {children}
      <Modal onClickOutside={router.back} onClose={router.back} show={pathname !== '/accounts'}>
        {modal}
      </Modal>
    </Authenticated>
  )
}
