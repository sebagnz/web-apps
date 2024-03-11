'use client'

import { usePathname, useRouter } from 'next/navigation'

import { useRedirectToLogin } from '@/hooks/auth/use-redirect-to-login'

import { Modal } from '@/components/modal'

type AccountsLayoutProps = {
  children: React.ReactNode
  modal: React.ReactNode
}

const MODAL_VIEWS = ['/accounts/new']

export default function AccountsLayout({ children, modal }: AccountsLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()

  useRedirectToLogin()

  return (
    <>
      {children}
      <Modal onClickOutside={router.back} onClose={router.back} show={MODAL_VIEWS.includes(pathname)}>
        {modal}
      </Modal>
    </>
  )
}
