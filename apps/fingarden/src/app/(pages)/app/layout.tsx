'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Routes } from '@/routes'

import { BaseLayout } from '@web-apps/ui'
import { UITabs } from '@web-apps/ui'

import { useRedirectToLogin } from '@/hooks/auth/use-redirect-to-login'

import { Header } from '@/components/header'
import { Modal } from '@/components/modal'
import { TransitionLink } from '@/components/transition-link'

type AccountsLayoutProps = {
  children: React.ReactNode
  modal: React.ReactNode
}

const TABS = [
  { id: 'accounts', label: 'Accounts', href: Routes.app.accounts.index },
  { id: 'savings', label: 'Savings', href: Routes.app.savings.index },
]

const { Tab, TabList, Tabs } = UITabs

export default function AccountsLayout({ children, modal }: AccountsLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()

  const [selectedIndex, onSelect] = useState(-1)

  useEffect(() => {
    const selectedTab = TABS.findIndex((tab) => tab.href === pathname)
    onSelect(selectedTab)
  }, [pathname])

  useRedirectToLogin()

  return (
    <BaseLayout
      header={<Header />}
      main={
        <main>
          <Tabs selectedIndex={selectedIndex} onSelect={onSelect}>
            <TabList className="mx-auto -translate-y-1/3 bg-accent-muted/30 backdrop-blur-md">
              {TABS.map((tab, i) => (
                <Tab key={tab.id} index={i}>
                  <TransitionLink href={tab.href}>{tab.label}</TransitionLink>
                </Tab>
              ))}
            </TabList>
          </Tabs>
          <div id="transition-root">{children}</div>
          <Modal onClickOutside={router.back} onClose={router.back} show={pathname.endsWith('/new')}>
            {modal}
          </Modal>
        </main>
      }
    />
  )
}
