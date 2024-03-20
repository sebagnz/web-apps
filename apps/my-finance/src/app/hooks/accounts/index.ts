import { createFirestoreTransactionManager } from '@/hooks/firebase'
import { createLocalStorageTransactionManager } from '@/hooks/local-storage'
import { createFirestoreSnapshotsRepository } from '@/hooks/snapshots/snapshots-firestore-repository'
import { createLocalStorageSnapshotsRepository } from '@/hooks/snapshots/snapshots-local-storage-repository'

import { AccountsService, createAccountsService } from '@/services'

import { createFirestoreAccountsRepository } from './accounts-firestore-repository'
import { createLocalStorageAccountsRepository } from './accounts-local-storage-repository'
import { createUseAccounts } from './use-accounts'

let accountsService: AccountsService

if (process.env.NEXT_PUBLIC_STORAGE === 'local-storage') {
  const transactionManager = createLocalStorageTransactionManager()
  const snapshotsRepository = createLocalStorageSnapshotsRepository()
  const accountsRepository = createLocalStorageAccountsRepository()
  accountsService = createAccountsService(accountsRepository, snapshotsRepository, transactionManager)
} else {
  const transactionManager = createFirestoreTransactionManager()
  const snapshotsRepository = createFirestoreSnapshotsRepository(transactionManager)
  const accountsRepository = createFirestoreAccountsRepository(transactionManager)
  accountsService = createAccountsService(accountsRepository, snapshotsRepository, transactionManager)
}

export const useAccounts = createUseAccounts(accountsService)

export { ACCOUNTS_CACHE_KEY } from './use-accounts'
