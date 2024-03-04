'use client'

import clsx from 'clsx'
import { Sarabun } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { BaseHeader, BaseLayout } from '@web-apps/ui'
import { ArrowLeftToBracketIcon, ArrowRightToBracketIcon } from '@web-apps/ui'

import { useAuth } from '@/hooks/auth'

import { Authenticated, Unauthenticated } from '@/components/Authentication'

import './globals.css'

const font = Sarabun({ subsets: ['latin'], weight: ['200', '300', '400', '500', '600', '700', '800'] })

const AuthButton = () => {
  const { login, logout } = useAuth()

  return (
    <>
      <Authenticated>
        <button className="flex items-center gap-x-1 text-sm text-content-secondary" onClick={logout}>
          <span>Sign out</span>
          <ArrowRightToBracketIcon className="relative top-[1px] w-[20px] h-[20px]" />
        </button>
      </Authenticated>
      <Unauthenticated>
        <button className="flex items-center gap-x-1 text-sm text-content-secondary" onClick={() => login('sebastiangon11@gmail.com', '123456')}>
          <span>Sign in</span>
          <ArrowLeftToBracketIcon className="relative top-[1px] w-[20px] h-[20px]" />
        </button>
      </Unauthenticated>
    </>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <BaseLayout
          header={
            <BaseHeader className={clsx('py-2 mx-4', 'justify-center items-center', 'border-b border-white/10 border-x-slate-300')}>
              <div className="min-w-max mr-auto"></div>
              <p className="text-lg">My Finances</p>
              <div className="min-w-max ml-auto">
                <AuthButton />
              </div>
            </BaseHeader>
          }
          leftSidebar={<div className="h-full flex flex-col justify-center items-center"></div>}
          main={<main>{children}</main>}
          rightSidebar={<div className="h-full flex flex-col justify-center items-center"></div>}
        />
        <ToastContainer position="bottom-center" autoClose={4000} closeOnClick />
      </body>
    </html>
  )
}
