import clsx from 'clsx'
import { Sarabun } from 'next/font/google'

import { BaseFooter, BaseHeader, BaseLayout } from '@web-apps/ui'

import './globals.css'

const font = Sarabun({ subsets: ['latin'], weight: ['200', '300', '400', '500', '600', '700', '800'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <BaseLayout
          header={<BaseHeader className={clsx('py-2', 'justify-center', 'border-b border-x-slate-300')}>This is the header</BaseHeader>}
          leftSidebar={<div className="h-full flex flex-col justify-center items-center bg-slate-700">👈</div>}
          main={
            <>
              <main>{children}</main>
            </>
          }
          rightSidebar={<div className="h-full flex flex-col justify-center items-center bg-slate-700">👉</div>}
          footer={<BaseFooter className={clsx('py-2', 'justify-center', 'border-t border-x-slate-300')}>This is the footer</BaseFooter>}
        />
      </body>
    </html>
  )
}
