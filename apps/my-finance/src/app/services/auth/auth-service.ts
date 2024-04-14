import { AuthProvider, User } from '@/domain'

export interface AuthService {
  register: (email: string, password: string) => Promise<void>
  loginWithEmail: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  getLoggedUser: () => Promise<User | null>
  onAuthStateChanged: (callback: (user: User | null) => void) => () => void
}

export const createAuthService = (provider: AuthProvider): AuthService => {
  return {
    register: async (email: string, password: string) => {
      return provider.register(email, password)
    },
    loginWithEmail: async (email: string, password: string) => {
      return provider.loginWithEmail(email, password)
    },
    loginWithGoogle: async () => {
      return provider.loginWithGoogle()
    },
    logout: async () => {
      return provider.logout()
    },
    getLoggedUser: async () => {
      return provider.getLoggerUser()
    },
    onAuthStateChanged: (callback) => {
      return provider.onAuthStateChanged(callback)
    },
  }
}
