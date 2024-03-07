'use client'

import { usePathname, useRouter } from 'next/navigation'

import { Authenticated } from '@/components/auth/auth'
import { Modal } from '@/components/modal'

type AccountsLayoutProps = {
  children: React.ReactNode
  modal: React.ReactNode
}

const MODAL_VIEWS = ['/accounts/new']

export default function AccountsLayout({ children, modal }: AccountsLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Authenticated redirectToLogin fallback={<div>Checking authentication...</div>}>
      {children}
      <Modal onClickOutside={router.back} onClose={router.back} show={MODAL_VIEWS.includes(pathname)}>
        {modal}
      </Modal>
    </Authenticated>
  )
}
