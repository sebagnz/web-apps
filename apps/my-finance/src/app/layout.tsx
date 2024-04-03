'use client'

import clsx from 'clsx'
import { Ubuntu } from 'next/font/google'
import { usePathname, useRouter } from 'next/navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { BaseHeader, BaseLayout } from '@web-apps/ui'

import { AuthButton } from '@/components/auth/auth-button'

import { Modal } from './components/modal'
import './globals.css'

const font = Ubuntu({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })

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
            <BaseHeader
              className={clsx(
                'pt-6 pb-12 px-4',
                'justify-center items-center',
                'bg-gradient-to-b from-base-accent to-base-accent/80 text-content-accent',
              )}
            >
              <div className="min-w-[100px] mr-auto"></div>
              <p className="text-xl font-medium">My Finances</p>
              <div className="min-w-[100px] ml-auto">
                <AuthButton className="ml-auto text-content-accent" />
              </div>
            </BaseHeader>
          }
          main={<main>{children}</main>}
        />
        <Modal onClickOutside={goHome} onClose={goHome} show={MODAL_VIEWS.includes(pathname)}>
          {modal}
        </Modal>
        <ToastContainer position="bottom-center" autoClose={4000} closeOnClick />
      </body>
    </html>
  )
}
