'use client'

import { Ubuntu } from 'next/font/google'
import { usePathname, useRouter } from 'next/navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { twMerge } from 'tailwind-merge'

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
        {children}

        <Modal onClickOutside={goHome} onClose={goHome} show={MODAL_VIEWS.includes(pathname)}>
          {modal}
        </Modal>

        <ToastContainer position="bottom-center" autoClose={4000} pauseOnHover closeOnClick />
      </body>
    </html>
  )
}
