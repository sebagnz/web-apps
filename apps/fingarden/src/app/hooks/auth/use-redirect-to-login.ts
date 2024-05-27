import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { Routes } from '@/routes'

import { useAuth } from '@/hooks/auth'

export const useRedirectToLogin = () => {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (isLoading) return
    if (user) return
    if (pathname === Routes.login.index) return

    router.replace(`${Routes.login.index}?origin=${encodeURIComponent(pathname)}`)
  }, [isLoading, user, router, pathname])
}
