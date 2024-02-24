'use client'

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
    <>
      {children}
      <Modal onClickOutside={router.back} show={pathname !== '/accounts'}>
        {modal}
      </Modal>
    </>
  )
}
