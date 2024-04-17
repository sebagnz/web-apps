import { ReactNode } from 'react'

import { useAuth } from '@/hooks/auth'

type AuthenticationProps = {
  children: ReactNode
  loading?: ReactNode
  fallback?: ReactNode
}

const Authenticated = ({ children, loading = null, fallback = null }: AuthenticationProps & { redirectToLogin?: boolean }) => {
  const { user, isLoading } = useAuth()

  if (isLoading) return loading || null
  else if (user) return children
  else return fallback || null
}

const Unauthenticated = ({ children, loading = null, fallback = null }: AuthenticationProps) => {
  const { user, isLoading } = useAuth()

  if (isLoading) return loading || null
  else if (!user) return children
  else return fallback || null
}

export { Authenticated, Unauthenticated }
