import { beforeEach, describe, expect, it, vi } from 'vitest'

import { createMockAccount, createMockAccountsRepository, createMockSnapshot, createMockSnapshotsRepository } from '@/domain'

import { createMockTransactionManager } from '../index'
import { createAccountsService } from './accounts-service'

const accountsRepository = createMockAccountsRepository()
const snapshotsRepository = createMockSnapshotsRepository()
const transactionManager = createMockTransactionManager()

const accountCreateSpy = vi.spyOn(accountsRepository, 'create')
const accountGetSpy = vi.spyOn(accountsRepository, 'get')
const accountsGetByUserSpy = vi.spyOn(accountsRepository, 'getByUser')
const accountUpdateSpy = vi.spyOn(accountsRepository, 'update')
const accountDeleteSpy = vi.spyOn(accountsRepository, 'delete')

const snapshotCreateSpy = vi.spyOn(snapshotsRepository, 'create')
const snapshotGetByAccountsSpy = vi.spyOn(snapshotsRepository, 'getByAccounts')

const runTransactionSpy = vi.spyOn(transactionManager, 'runTransaction')

const accountsService = createAccountsService(accountsRepository, snapshotsRepository, transactionManager)

beforeEach(() => {
  vi.clearAllMocks()
})

describe('AccountsService - Account creation', () => {
  it('should run in a transaction', async () => {
    await accountsService.create({ name: 'test', balance: 1000, image: '🤑' })
    expect(runTransactionSpy).toHaveBeenCalledTimes(1)
  })

  it('should create the account and the first snapshot', async () => {
    const account = createMockAccount({ id: 'mock-account' })
    accountCreateSpy.mockResolvedValueOnce(account)

    const { id: accountId, name, balance, image } = account

    await accountsService.create({ name, balance, image })

    expect(accountCreateSpy).toHaveBeenCalledTimes(1)
    expect(accountCreateSpy).toHaveBeenCalledWith({ name, balance, image })

    expect(snapshotCreateSpy).toHaveBeenCalledTimes(1)
    expect(snapshotCreateSpy).toHaveBeenCalledWith({ accountId, balance, date: expect.any(Date) })
  })

  it('should not create the snapshot if the account creation fails', async () => {
    const error = new Error('Error creating account')
    accountCreateSpy.mockRejectedValueOnce(error)

    try {
      await accountsService.create({ name: 'test', balance: 1000, image: '🤑' })
    } catch (e) {
      expect(e).toBe(error)
    }

    expect(accountCreateSpy).toHaveBeenCalledTimes(1)
    expect(snapshotCreateSpy).not.toHaveBeenCalled()
  })
})

describe('AccountsService - Account deletion', () => {
  it('should run in a transaction', async () => {
    await accountsService.delete('mock-account')
    expect(runTransactionSpy).toHaveBeenCalledTimes(1)
  })

  it('should throw if it fails to retrieve the account', async () => {
    const error = new Error('Error retrieving account')
    accountGetSpy.mockRejectedValueOnce(error)

    try {
      await accountsService.delete('mock-account')
    } catch (error) {
      expect(error).toBe(error)
    }

    expect(accountGetSpy).toHaveBeenCalledTimes(1)
    expect(accountDeleteSpy).not.toHaveBeenCalledTimes(1)
  })

  it("should throw if the account doesn't exist", async () => {
    const expectedError = new Error('Account not found')
    accountGetSpy.mockResolvedValueOnce(undefined)

    try {
      await accountsService.delete('mock-account')
    } catch (e) {
      expect(e).toStrictEqual(expectedError)
    }

    expect(accountGetSpy).toHaveBeenCalledTimes(1)
    expect(accountDeleteSpy).not.toHaveBeenCalledTimes(1)
  })

  it('should throw if it fails to retrieve the snapshots', async () => {
    const account = createMockAccount()
    accountGetSpy.mockResolvedValueOnce(account)

    const error = new Error('Error retrieving snapshots')
    snapshotGetByAccountsSpy.mockRejectedValueOnce(error)

    try {
      await accountsService.delete(account.id)
    } catch (e) {
      expect(e).toBe(error)
    }

    expect(accountGetSpy).toHaveBeenCalledTimes(1)
    expect(snapshotGetByAccountsSpy).toHaveBeenCalledTimes(1)
    expect(accountDeleteSpy).not.toHaveBeenCalledTimes(1)
  })

  it('should throw if the account has snapshots', async () => {
    const account = createMockAccount()
    accountGetSpy.mockResolvedValueOnce(account)

    const snapshot = createMockSnapshot()
    snapshotGetByAccountsSpy.mockResolvedValueOnce([snapshot])

    const expectedError = new Error('Accounts with snapshots cannot be deleted.')

    try {
      await accountsService.delete(account.id)
    } catch (e) {
      expect(e).toStrictEqual(expectedError)
    }

    expect(accountGetSpy).toHaveBeenCalledTimes(1)
    expect(snapshotGetByAccountsSpy).toHaveBeenCalledTimes(1)
    expect(accountDeleteSpy).not.toHaveBeenCalledTimes(1)
  })

  it('should delete the account', async () => {
    const account = createMockAccount()
    accountGetSpy.mockResolvedValueOnce(account)

    snapshotGetByAccountsSpy.mockResolvedValueOnce([])

    await accountsService.delete(account.id)

    expect(accountGetSpy).toHaveBeenCalledTimes(1)
    expect(snapshotGetByAccountsSpy).toHaveBeenCalledTimes(1)
    expect(accountDeleteSpy).toHaveBeenCalledTimes(1)
    expect(accountDeleteSpy).toHaveBeenCalledWith(account.id)
  })
})

describe('AccountsService - Account update', () => {
  it('should update the account', async () => {
    accountUpdateSpy.mockResolvedValueOnce()

    const account = createMockAccount({ balance: 100 })
    const updatedAccount = { ...account, balance: 200 }

    await accountsService.update(updatedAccount)

    expect(accountUpdateSpy).toHaveBeenCalledTimes(1)
    expect(accountUpdateSpy).toHaveBeenCalledWith(updatedAccount)
  })

  it('should throw if it fails to retrieve the account', async () => {
    const error = new Error('Error updating account')
    accountUpdateSpy.mockRejectedValueOnce(error)

    try {
      await accountsService.update(createMockAccount())
    } catch (e) {
      expect(e).toBe(error)
    }

    expect(accountUpdateSpy).toHaveBeenCalledTimes(1)
  })
})

describe('AccountsService - Account get', () => {
  it('should get the account', async () => {
    const account = createMockAccount()
    accountGetSpy.mockResolvedValueOnce(account)

    const result = await accountsService.get(account.id)

    expect(result).toStrictEqual(account)
    expect(accountGetSpy).toHaveBeenCalledTimes(1)
    expect(accountGetSpy).toHaveBeenCalledWith(account.id)
  })

  it('should return undefined if the account does not exist', async () => {
    accountGetSpy.mockResolvedValueOnce(undefined)

    const result = await accountsService.get('non-existing-account')

    expect(result).toBeUndefined()
    expect(accountGetSpy).toHaveBeenCalledTimes(1)
    expect(accountGetSpy).toHaveBeenCalledWith('non-existing-account')
  })

  it('should throw if it fails to retrieve the account', async () => {
    const error = new Error('Error retrieving account')
    accountGetSpy.mockRejectedValueOnce(error)

    try {
      await accountsService.get('mock-account')
    } catch (e) {
      expect(e).toBe(error)
    }

    expect(accountGetSpy).toHaveBeenCalledTimes(1)
  })
})

describe('AccountsService - Account getByUser', () => {
  it('should get the accounts', async () => {
    const accounts = [createMockAccount(), createMockAccount()]
    accountsGetByUserSpy.mockResolvedValueOnce(accounts)

    const result = await accountsService.getByUser('mock-user')

    expect(result).toStrictEqual(accounts)
    expect(accountsGetByUserSpy).toHaveBeenCalledTimes(1)
    expect(accountsGetByUserSpy).toHaveBeenCalledWith('mock-user')
  })

  it('should return an empty array if the user has no accounts', async () => {
    accountsGetByUserSpy.mockResolvedValueOnce([])

    const result = await accountsService.getByUser('mock-user')

    expect(result).toStrictEqual([])
    expect(accountsGetByUserSpy).toHaveBeenCalledTimes(1)
    expect(accountsGetByUserSpy).toHaveBeenCalledWith('mock-user')
  })

  it('should throw if it fails to retrieve the accounts', async () => {
    const error = new Error('Error retrieving accounts')
    accountsGetByUserSpy.mockRejectedValueOnce(error)

    try {
      await accountsService.getByUser('mock-user')
    } catch (e) {
      expect(e).toBe(error)
    }

    expect(accountsGetByUserSpy).toHaveBeenCalledTimes(1)
  })
})
