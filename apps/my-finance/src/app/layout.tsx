'use client'

import clsx from 'clsx'
import { Sarabun } from 'next/font/google'
import { usePathname, useRouter } from 'next/navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { BaseHeader, BaseLayout } from '@web-apps/ui'

import { AuthButton } from '@/components/auth/auth-button'

import { Modal } from './components/modal'
import './globals.css'

const font = Sarabun({ subsets: ['latin'], weight: ['200', '300', '400', '500', '600', '700', '800'] })

type RootLayoutProps = {
  children: React.ReactNode
  modal: React.ReactNode
}

const MODAL_VIEWS = ['/login']

export default function RootLayout({ children, modal }: RootLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()

  const goHome = () => router.push('/')

  return (
    <html lang="en">
      <body className={font.className}>
        <BaseLayout
          header={
            <BaseHeader className={clsx('py-2 mx-4', 'justify-center items-center', 'border-b border-white/10 border-x-slate-300')}>
              <div className="min-w-[100px] mr-auto"></div>
              <p className="text-lg">My Finances</p>
              <div className="min-w-[100px] ml-auto">
                <AuthButton className="ml-auto" />
              </div>
            </BaseHeader>
          }
          leftSidebar={<div className="h-full flex flex-col justify-center items-center"></div>}
          main={<main>{children}</main>}
          rightSidebar={<div className="h-full flex flex-col justify-center items-center"></div>}
        />
        <Modal onClickOutside={goHome} onClose={goHome} show={MODAL_VIEWS.includes(pathname)}>
          {modal}
        </Modal>
        <ToastContainer position="bottom-center" autoClose={4000} closeOnClick />
      </body>
    </html>
  )
}
