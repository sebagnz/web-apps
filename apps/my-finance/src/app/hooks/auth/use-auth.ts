import { useEffect } from 'react'
import useSWR, { useSWRConfig } from 'swr'

import { AuthService } from '@/services'

const USER_KEY = 'user'

export const createUseAuth = (authService: AuthService) => () => {
  const { mutate } = useSWRConfig()

  const { data: user, error, isLoading } = useSWR(USER_KEY, authService.getLoggedUser, { fallbackData: null, revalidateOnMount: true })

  useEffect(() => authService.onAuthStateChanged((user) => mutate(USER_KEY)), [mutate])

  const register = async (email: string, password: string) => {
    const registerFn = async () => await authService.register(email, password)
    return mutate(USER_KEY, registerFn)
  }

  const login = async (email: string, password: string) => {
    const loginFn = async () => await authService.login(email, password)
    return mutate(USER_KEY, loginFn)
  }

  const logout = async () => {
    const logoutFn = async () => await authService.logout()
    return mutate(USER_KEY, logoutFn)
  }

  return {
    register,
    login,
    logout,
    user,
    error,
    isLoading,
  }
}
