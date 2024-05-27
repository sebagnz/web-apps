'use client'

import { BaseLayout } from '@web-apps/ui'

import { useRedirectToLogin } from '@/hooks/auth/use-redirect-to-login'

import { Header } from '@/components/header'

type LayoutProps = {
  children: React.ReactNode
  drawer: React.ReactNode
}

export default function Layout({ children, drawer }: LayoutProps) {
  useRedirectToLogin()

  return (
    <BaseLayout className="h-svh">
      <BaseLayout.Header>
        <Header />
      </BaseLayout.Header>
      <BaseLayout.Main id="transition-root" className="flex h-full max-h-full overflow-auto">
        <div className="h-full max-h-full overflow-auto flex-1">{children}</div>
        <div className="contents h-full max-h-full">{drawer}</div>
      </BaseLayout.Main>
    </BaseLayout>
  )
}
