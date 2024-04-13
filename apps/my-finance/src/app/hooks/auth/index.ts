import { createAuthService } from '@/services'

import { createAuthFirebaseProvider } from './auth-firebase-provider'
import { createUseAuth } from './use-auth'

const authFirebaseService = createAuthService(createAuthFirebaseProvider())

export const useAuth = createUseAuth(authFirebaseService)
