import { accountsFirestoreService } from './accounts-firestore-service'
import { accountsLocalStorageService } from './accounts-local-storage-service'
import { createUseAccounts } from './use-accounts'

let useAccounts: ReturnType<typeof createUseAccounts>

if (process.env.NEXT_PUBLIC_ENV === 'development') {
  useAccounts = createUseAccounts(accountsLocalStorageService)
} else {
  useAccounts = createUseAccounts(accountsFirestoreService)
}

export { useAccounts }
