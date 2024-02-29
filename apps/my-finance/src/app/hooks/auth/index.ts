import { authFirebaseService } from './auth-firebase-service'
import { createUseAuth } from './use-auth'

export const useAuth = createUseAuth(authFirebaseService)
