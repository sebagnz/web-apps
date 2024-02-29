import { User } from './user'

export interface AuthProvider {
  register: (email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  getLoggerUser: () => Promise<User | null>
  onAuthStateChanged: (callback: (user: User | null) => void) => void
}
