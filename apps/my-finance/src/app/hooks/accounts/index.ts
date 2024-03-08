import { AccountsService, createAccountsService } from '@/services'

import { createFirestoreAccountsRepository } from './accounts-firestore-repository'
import { createLocalStorageAccountsRepository } from './accounts-local-storage-repository'
import { createUseAccounts } from './use-accounts'

let accountsService: AccountsService

if (process.env.NEXT_PUBLIC_ENV === 'development') {
  accountsService = createAccountsService(createLocalStorageAccountsRepository())
} else {
  accountsService = createAccountsService(createFirestoreAccountsRepository())
}

export const useAccounts = createUseAccounts(accountsService)
