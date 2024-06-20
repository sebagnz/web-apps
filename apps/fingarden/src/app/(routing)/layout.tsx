import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { twMerge } from 'tailwind-merge'

import '../globals.css'

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={twMerge('bg-gradient-to-b from-neutral-100 from-85% to-neutral-500/20 text-base', 'font-sans')}>
        {children}
        <ToastContainer position="bottom-center" autoClose={4000} pauseOnHover closeOnClick />
      </body>
    </html>
  )
}
