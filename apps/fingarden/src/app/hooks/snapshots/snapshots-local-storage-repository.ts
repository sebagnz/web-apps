import { v4 as uuidv4 } from 'uuid'

import { SnapshotListSchema, SnapshotsRepository } from '@/domain'

const LOCALSTORAGE_NAMESPACE = 'fingarden'
const LOCALSTORAGE_ACCOUNTS_KEY = `${LOCALSTORAGE_NAMESPACE}:snapshots`

function delay(minMs: number = 200, maxMs: number = 600) {
  const delayMs = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs
  return new Promise((res) => setTimeout(res, delayMs))
}

export const createLocalStorageSnapshotsRepository = (): SnapshotsRepository => {
  return {
    create: async (snapshot) => {
      const id = uuidv4()
      const maybeSnapshotList = JSON.parse(localStorage.getItem(LOCALSTORAGE_ACCOUNTS_KEY) || '[]')
      const snapshotList = SnapshotListSchema.parse(maybeSnapshotList)

      const newSnapshot = { ...snapshot, id }
      const newSnapshotList = snapshotList.concat(newSnapshot)
      localStorage.setItem(LOCALSTORAGE_ACCOUNTS_KEY, JSON.stringify(newSnapshotList))

      await delay()
    },
    update: async (snapshot) => {
      const { balance, date } = snapshot

      const maybeSnapshotList = JSON.parse(localStorage.getItem(LOCALSTORAGE_ACCOUNTS_KEY) || '[]')
      const snapshotList = SnapshotListSchema.parse(maybeSnapshotList)

      const newSnapshotList = snapshotList.map((snap) => (snap.id === snapshot.id ? { ...snapshot, balance, date } : snap))
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
    getByAccounts: async (accountIds, options) => {
      const maybeSnapshotList = JSON.parse(localStorage.getItem(LOCALSTORAGE_ACCOUNTS_KEY) || '[]')
      const accountsSnapshotsList = SnapshotListSchema.parse(maybeSnapshotList).filter((snap) => accountIds.includes(snap.accountId))

      const orderedSnapshotList =
        options.order === 'asc'
          ? accountsSnapshotsList.sort((a, b) => a.date.getTime() - b.date.getTime())
          : accountsSnapshotsList.sort((a, b) => b.date.getTime() - a.date.getTime())

      await delay()

      return orderedSnapshotList
    },
  }
}
