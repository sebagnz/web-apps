import clsx from 'clsx'
import { Sarabun } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { BaseHeader, BaseLayout } from '@web-apps/ui'

import './globals.css'

const font = Sarabun({ subsets: ['latin'], weight: ['200', '300', '400', '500', '600', '700', '800'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <BaseLayout
          header={<BaseHeader className={clsx('py-2', 'justify-center', 'border-b border-white/10 border-x-slate-300')}>My Finances</BaseHeader>}
          leftSidebar={<div className="h-full flex flex-col justify-center items-center"></div>}
          main={<main>{children}</main>}
          rightSidebar={<div className="h-full flex flex-col justify-center items-center"></div>}
        />
        <ToastContainer position="bottom-center" autoClose={4000} closeOnClick />
      </body>
    </html>
  )
}
