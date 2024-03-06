import { accountsFirestoreService } from './accounts-firestore-service'
import { accountsLocalStorageService } from './accounts-local-storage-service'
import { createUseAccounts } from './use-accounts'

export const useAccounts = createUseAccounts(accountsLocalStorageService)
