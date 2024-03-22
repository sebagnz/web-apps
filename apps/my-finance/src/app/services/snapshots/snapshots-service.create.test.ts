import { beforeEach, describe, expect, it, vi } from 'vitest'

import { createMockAccount, createMockAccountsRepository, createMockSnapshot, createMockSnapshotsRepository } from '@/domain'

import { createMockTransactionManager } from '../index'
import { createSnapshotsService } from './snapshots-service'

const accountsRepository = createMockAccountsRepository()
const snapshotsRepository = createMockSnapshotsRepository()
const transactionManager = createMockTransactionManager()

const accountGetSpy = vi.spyOn(accountsRepository, 'get')
const accountUpdateSpy = vi.spyOn(accountsRepository, 'update')

const snapshotCreateSpy = vi.spyOn(snapshotsRepository, 'create')
const snapshotGetByAccountsSpy = vi.spyOn(snapshotsRepository, 'getByAccounts')

const runTransactionSpy = vi.spyOn(transactionManager, 'runTransaction')

const snapshotsService = createSnapshotsService(snapshotsRepository, accountsRepository, transactionManager)

beforeEach(() => {
  vi.clearAllMocks()
})

describe('SnapshotsService - Snapshot creation', () => {
  it('should run in a transaction', async () => {
    await snapshotsService.create({ accountId: 'mock-snapshot', balance: 1000, date: new Date() })
    expect(runTransactionSpy).toHaveBeenCalledTimes(1)
  })

  describe('Preconditions', () => {
    it('should throw if it fails to retrieve the account', async () => {
      const error = new Error('Error retrieving account')
      accountGetSpy.mockRejectedValueOnce(error)

      const { accountId, balance, date } = createMockSnapshot()

      try {
        await snapshotsService.create({ accountId, balance, date })
      } catch (e) {
        expect(e).toBe(error)
      }

      expect(snapshotCreateSpy).not.toHaveBeenCalled()
    })

    it("should throw if the account doesn't exist", async () => {
      accountGetSpy.mockResolvedValueOnce(undefined)

      const { accountId, balance, date } = createMockSnapshot()

      try {
        await snapshotsService.create({ accountId, balance, date })
      } catch (e) {
        expect(e).toStrictEqual(new Error('Account not found'))
      }

      expect(snapshotCreateSpy).not.toHaveBeenCalled()
    })

    it('should throw if it fails to retrieve the snapshots', async () => {
      const error = new Error('Error retrieving snapshots')
      snapshotGetByAccountsSpy.mockRejectedValueOnce(error)

      const account = createMockAccount()
      accountGetSpy.mockResolvedValueOnce(account)

      const { accountId, balance, date } = createMockSnapshot({ accountId: account.id })

      try {
        await snapshotsService.create({ accountId, balance, date })
      } catch (e) {
        expect(e).toBe(error)
      }

      expect(snapshotCreateSpy).not.toHaveBeenCalled()
    })
  })

  describe('When the account has no snapshots', () => {
    const account = createMockAccount()

    it('should update the account balance and create the snapshot', async () => {
      accountGetSpy.mockResolvedValueOnce(account)
      snapshotGetByAccountsSpy.mockResolvedValueOnce([])

      const { accountId, balance, date } = createMockSnapshot({ accountId: account.id })

      await snapshotsService.create({ accountId, balance, date })

      expect(accountUpdateSpy).toHaveBeenCalledTimes(1)
      expect(accountUpdateSpy).toHaveBeenCalledWith({ ...account, balance })

      expect(snapshotCreateSpy).toHaveBeenCalledTimes(1)
      expect(snapshotCreateSpy).toHaveBeenCalledWith({ accountId, balance, date })
    })
  })

  describe('When the latest snapshot is older than the new one', () => {
    const account = createMockAccount()
    const lastSnapshot = createMockSnapshot({ accountId: account.id, balance: 100, date: new Date('1999-01-01') })
    const newSnapshot = createMockSnapshot({ accountId: account.id, balance: 200, date: new Date('2000-01-01') })

    it('should  update the account balance and create the snaphsot', async () => {
      accountGetSpy.mockResolvedValueOnce(account)
      snapshotGetByAccountsSpy.mockResolvedValueOnce([lastSnapshot])

      await snapshotsService.create({
        accountId: newSnapshot.accountId,
        balance: newSnapshot.balance,
        date: newSnapshot.date,
      })

      expect(accountUpdateSpy).toHaveBeenCalledTimes(1)
      expect(accountUpdateSpy).toHaveBeenCalledWith({ ...account, balance: newSnapshot.balance })

      expect(snapshotCreateSpy).toHaveBeenCalledTimes(1)
      expect(snapshotCreateSpy).toHaveBeenCalledWith({
        accountId: newSnapshot.accountId,
        balance: newSnapshot.balance,
        date: newSnapshot.date,
      })
    })
  })

  describe('When the latest snapshot is newer than the new one', () => {
    const account = createMockAccount()
    const lastSnapshot = createMockSnapshot({ accountId: account.id, balance: 100, date: new Date('2000-01-01') })
    const newSnapshot = createMockSnapshot({ accountId: account.id, balance: 200, date: new Date('1999-01-01') })

    it('should not update the account balance', async () => {
      accountGetSpy.mockResolvedValueOnce(account)
      snapshotGetByAccountsSpy.mockResolvedValueOnce([lastSnapshot])

      await snapshotsService.create({
        accountId: newSnapshot.accountId,
        balance: newSnapshot.balance,
        date: newSnapshot.date,
      })

      expect(accountUpdateSpy).not.toHaveBeenCalled()
      expect(snapshotCreateSpy).toHaveBeenCalledTimes(1)
      expect(snapshotCreateSpy).toHaveBeenCalledWith({
        accountId: newSnapshot.accountId,
        balance: newSnapshot.balance,
        date: newSnapshot.date,
      })
    })
  })
})
