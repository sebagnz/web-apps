import { createFirestoreAccountsRepository } from '@/hooks/accounts/accounts-firestore-repository'
import { createLocalStorageAccountsRepository } from '@/hooks/accounts/accounts-local-storage-repository'
import { createFirestoreTransactionManager } from '@/hooks/firebase'
import { createLocalStorageTransactionManager } from '@/hooks/local-storage'

import { SnapshotsService, createSnapshotsService } from '@/services'

import { createFirestoreSnapshotsRepository } from './snapshots-firestore-repository'
import { createLocalStorageSnapshotsRepository } from './snapshots-local-storage-repository'
import { createUsePrefetchSnapshots, createUseSnapshots } from './use-snapshots'

let snapshotsService: SnapshotsService

if (process.env.NEXT_PUBLIC_STORAGE === 'local-storage') {
  const transactionManager = createLocalStorageTransactionManager()
  const snapshotsRepository = createLocalStorageSnapshotsRepository()
  const accountsRepository = createLocalStorageAccountsRepository()
  snapshotsService = createSnapshotsService(snapshotsRepository, accountsRepository, transactionManager)
} else {
  const transactionManager = createFirestoreTransactionManager()
  const snapshotsRepository = createFirestoreSnapshotsRepository(transactionManager)
  const accountsRepository = createFirestoreAccountsRepository(transactionManager)
  snapshotsService = createSnapshotsService(snapshotsRepository, accountsRepository, transactionManager)
}

export const useSnapshots = createUseSnapshots(snapshotsService)

export const usePrefetchSnapshots = createUsePrefetchSnapshots(snapshotsService)

export { SNAPSHOTS_CACHE_KEY } from './use-snapshots'
