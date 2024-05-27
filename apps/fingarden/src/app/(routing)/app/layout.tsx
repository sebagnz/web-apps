'use client'

import { BaseLayout } from '@web-apps/ui'

import { useRedirectToLogin } from '@/hooks/auth/use-redirect-to-login'

import { Header } from '@/components/header'

type LayoutProps = {
  children: React.ReactNode
  modal: React.ReactNode
  drawer: React.ReactNode
}

export default function Layout({ children, modal, drawer }: LayoutProps) {
  useRedirectToLogin()

  return (
    <div className="h-dvh">
      <BaseLayout className="max-h-full">
        <BaseLayout.Header>
          <Header />
        </BaseLayout.Header>
        <BaseLayout.Main id="transition-root" className="flex h-full max-h-full overflow-auto">
          <div className="h-full max-h-full overflow-auto flex-1">{children}</div>
          <div className="contents h-full max-h-full">{drawer}</div>
          {modal}
        </BaseLayout.Main>
      </BaseLayout>
    </div>
  )
}
