'use client'

import { Ubuntu } from 'next/font/google'
import { usePathname, useRouter } from 'next/navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { twMerge } from 'tailwind-merge'

import { BaseHeader, BaseLayout } from '@web-apps/ui'

import { Menu } from '@/components/menu'
import { Modal } from '@/components/modal'

import '../globals.css'

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
      <body className={twMerge('bg-base text-base', font.className)}>
        <BaseLayout
          header={
            <BaseHeader
              className={twMerge('pt-6 pb-10 px-4', 'justify-center items-center', 'bg-gradient-to-b from-accent-900 to-accent-900/80', 'shadow-md')}
            >
              <div className="flex-1"></div>
              <p className="text-xl text-inverted font-medium">My Finances</p>
              <div className="flex-1 relative flex items-center justify-end">
                <Menu />
              </div>
            </BaseHeader>
          }
          main={<main>{children}</main>}
        />

        <Modal onClickOutside={goHome} onClose={goHome} show={MODAL_VIEWS.includes(pathname)}>
          {modal}
        </Modal>

        <ToastContainer position="bottom-center" autoClose={4000} pauseOnHover closeOnClick />
      </body>
    </html>
  )
}
