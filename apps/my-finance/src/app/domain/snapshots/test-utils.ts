import { v4 as uuidv4 } from 'uuid'

import { Snapshot } from './snapshot'
import { SnapshotsRepository } from './snapshots-repository'

export const createMockSnapshot: (override?: Partial<Snapshot>) => Snapshot = (override = {}) => {
  return { id: uuidv4(), accountId: uuidv4(), balance: 1000, date: new Date(), userId: '123', ...override }
}

export const createMockSnapshotsRepository: () => SnapshotsRepository = () => {
  return {
    create: async (account) => {},
    update: async (account) => {},
    delete: async (id) => {},
    get: async (id) => createMockSnapshot({ id }),
    getByAccounts: async (accountIds) => [],
  }
}
