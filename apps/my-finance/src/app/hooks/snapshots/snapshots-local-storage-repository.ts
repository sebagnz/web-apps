import { v4 as uuidv4 } from 'uuid'

import { SnapshotListSchema, SnapshotsRepository } from '@/domain'

const LOCALSTORAGE_NAMESPACE = 'my-finance'
const LOCALSTORAGE_ACCOUNTS_KEY = `${LOCALSTORAGE_NAMESPACE}:snapshots`

function delay(minMs: number = 2000, maxMs: number = 3000) {
  const delayMs = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs
  return new Promise((res) => setTimeout(res, delayMs))
}

export const createLocalStorageSnapshotsRepository = (): SnapshotsRepository => {
  return {
    create: async (snapshot) => {
      const id = uuidv4()
      const maybeSnapshotList = JSON.parse(localStorage.getItem(LOCALSTORAGE_ACCOUNTS_KEY) || '[]')
      const snapshotList = SnapshotListSchema.parse(maybeSnapshotList)

      const newSnapshot = { ...snapshot, id, date: new Date() }
      const newSnapshotList = snapshotList.concat(newSnapshot)
      localStorage.setItem(LOCALSTORAGE_ACCOUNTS_KEY, JSON.stringify(newSnapshotList))

      await delay()
    },
    update: async (snapshot) => {
      const { balance } = snapshot

      const maybeSnapshotList = JSON.parse(localStorage.getItem(LOCALSTORAGE_ACCOUNTS_KEY) || '[]')
      const snapshotList = SnapshotListSchema.parse(maybeSnapshotList)

      const newSnapshotList = snapshotList.map((snap) => (snap.id === snapshot.id ? { ...snapshot, balance } : snap))
      localStorage.setItem(LOCALSTORAGE_ACCOUNTS_KEY, JSON.stringify(newSnapshotList))

      await delay()
    },
    delete: async (accountId, snapshotId) => {
      const maybeSnapshotList = JSON.parse(localStorage.getItem(LOCALSTORAGE_ACCOUNTS_KEY) || '[]')
      const snapshotList = SnapshotListSchema.parse(maybeSnapshotList)

      const newSnapshotList = snapshotList.filter((snap) => snap.id !== snapshotId && snap.accountId === accountId)
      localStorage.setItem(LOCALSTORAGE_ACCOUNTS_KEY, JSON.stringify(newSnapshotList))

      await delay()
    },
    get: async (accountId, snapshotId) => {
      const maybeSnapshotList = JSON.parse(localStorage.getItem(LOCALSTORAGE_ACCOUNTS_KEY) || '[]')
      const snapshotList = SnapshotListSchema.parse(maybeSnapshotList)

      await delay()

      return snapshotList.find((snap) => snap.id === snapshotId && snap.accountId === accountId)
    },
    getByAccounts: async (accountIds) => {
      const maybeSnapshotList = JSON.parse(localStorage.getItem(LOCALSTORAGE_ACCOUNTS_KEY) || '[]')
      const snapshotList = SnapshotListSchema.parse(maybeSnapshotList).filter((snap) => accountIds.includes(snap.accountId))

      await delay()

      return snapshotList
    },
  }
}
