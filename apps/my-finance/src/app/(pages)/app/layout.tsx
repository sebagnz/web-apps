'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { Routes } from '@/routes'

import { useRedirectToLogin } from '@/hooks/auth/use-redirect-to-login'

import { Modal } from '@/components/modal'
import { Tab, TabList, Tabs } from '@/components/tabs'

type AccountsLayoutProps = {
  children: React.ReactNode
  modal: React.ReactNode
}

const MODAL_VIEWS = [Routes.app.accounts.new, Routes.app.expenses.new]

const TABS = [
  { id: 'accounts', label: 'Accounts', href: Routes.app.accounts.index },
  { id: 'expenses', label: 'Expenses', href: Routes.app.expenses.index },
  { id: 'savings', label: 'Savings', href: Routes.app.savings.index },
]

export default function AccountsLayout({ children, modal }: AccountsLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()

  const [selectedIndex, onSelect] = useState(0)

  useRedirectToLogin()

  return (
    <>
      <div className="py-4 px-2 mb-4">
        <Tabs selectedIndex={selectedIndex} onSelect={onSelect}>
          <TabList className="mx-auto">
            {TABS.map((tab, i) => (
              <Tab key={tab.id} index={i}>
                <Link href={tab.href}>{tab.label}</Link>
              </Tab>
            ))}
          </TabList>
        </Tabs>
      </div>
      <div className="px-4 lg:px-0 mx-auto max-w-2xl">{children}</div>
      <Modal onClickOutside={router.back} onClose={router.back} show={MODAL_VIEWS.includes(pathname)}>
        {modal}
      </Modal>
    </>
  )
}
