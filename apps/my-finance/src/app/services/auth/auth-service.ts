import { AuthProvider, User } from '@/domain'

export interface AuthService {
  register: (email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  getLoggedUser: () => Promise<User | null>
  onAuthStateChanged: (callback: (user: User | null) => void) => void
}

export const createAuthService = (provider: AuthProvider): AuthService => {
  return {
    register: async (email: string, password: string) => {
      return provider.register(email, password)
    },
    login: async (email: string, password: string) => {
      return provider.login(email, password)
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
