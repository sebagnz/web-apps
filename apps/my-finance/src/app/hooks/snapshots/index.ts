import { SnapshotsService, createSnapshotsService } from '@/services'

import { createFirestoreSnapshotsRepository } from './snapshots-firestore-repository'
import { createLocalStorageSnapshotsRepository } from './snapshots-local-storage-repository'
import { createUseSnapshots } from './use-snapshots'

let snapshotsService: SnapshotsService

if (process.env.NEXT_PUBLIC_STORAGE === 'local-storage') {
  console.warn('[Snapshots storage has been set to local storage]')
  snapshotsService = createSnapshotsService(createLocalStorageSnapshotsRepository())
} else {
  snapshotsService = createSnapshotsService(createFirestoreSnapshotsRepository())
}

export const useAccounts = createUseSnapshots(snapshotsService)
