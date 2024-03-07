import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

import { useAuth } from '@/hooks/auth'

type AuthenticationProps = {
  children: ReactNode
  fallback?: ReactNode
}

const Authenticated = ({ redirectToLogin = false, children, fallback = null }: AuthenticationProps & { redirectToLogin?: boolean }) => {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (isLoading) return
    if (user) return
    if (pathname === '/login') return
    if (redirectToLogin) router.replace(`/login?origin=${encodeURIComponent(pathname)}`)
  }, [isLoading, user, router, pathname, redirectToLogin])

  if (isLoading) return fallback
  if (!user) return null
  return children
}

const Unauthenticated = ({ children, fallback = null }: AuthenticationProps) => {
  const { user, isLoading } = useAuth()

  if (isLoading) return fallback
  if (user) return null
  return children
}

export { Authenticated, Unauthenticated }
