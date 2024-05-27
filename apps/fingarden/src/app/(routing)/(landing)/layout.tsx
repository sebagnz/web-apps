import { BaseLayout } from '@web-apps/ui'

type LayoutProps = {
  children: React.ReactNode
  drawer: React.ReactNode
}

export default function Layout({ children, drawer }: LayoutProps) {
  return (
    <div className="h-dvh">
      <BaseLayout className="max-h-full">
        <BaseLayout.Main id="transition-root" className="flex h-full max-h-full overflow-auto">
          <div className="h-full max-h-full overflow-auto flex-1">{children}</div>
          <div className="contents h-full max-h-full">{drawer}</div>
        </BaseLayout.Main>
      </BaseLayout>
    </div>
  )
}
