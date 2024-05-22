import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useAuth } from '@/hooks/auth'

export const useRedirectToLogin = () => {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (isLoading) return
    if (user) return
    if (pathname === '/login') return

    router.replace(`/login?origin=${encodeURIComponent(pathname)}`)
  }, [isLoading, user, router, pathname])
}
