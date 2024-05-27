import { Ubuntu } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { twMerge } from 'tailwind-merge'

import '../globals.css'

const font = Ubuntu({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={twMerge('bg-muted text-base', font.className)}>
        {children}
        <ToastContainer position="bottom-center" autoClose={4000} pauseOnHover closeOnClick />
      </body>
    </html>
  )
}
