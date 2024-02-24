import { accountsLocalStorageService } from './accounts-local-storage-service'
import { createUseAccounts } from './use-accounts'

export const useAccounts = createUseAccounts(accountsLocalStorageService)
