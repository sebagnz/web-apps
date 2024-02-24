import { BaseFooter, BaseHeader, BaseLayout } from '@web-apps/ui'
import clsx from 'clsx'
import { Sarabun } from 'next/font/google'

import './globals.css'

const font = Sarabun({ subsets: ['latin'], weight: ['200', '300', '400', '500', '600', '700', '800'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <BaseLayout
          header={<BaseHeader className={clsx('relative', 'px-4', 'py-3 lg:py-2', 'border-b border-x-slate-300')}>{/* <MainNav /> */}</BaseHeader>}
          main={
            <>
              <main>{children}</main>
            </>
          }
          footer={
            <BaseFooter className="bg-slate-600/20 text-base-content-3 text-xs !py-10">
              <div className="flex flex-col gap-y-4 justify-between md:flex-row md:justify-around items-center max-w-screen-xl mx-auto">
                <div className="grid grid-cols-1 gap-y-2 md:grid-cols-3 md:gap-x-3 text-center"></div>
              </div>
            </BaseFooter>
          }
        />
      </body>
    </html>
  )
}
