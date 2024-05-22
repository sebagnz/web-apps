import { beforeEach, describe, expect, it, vi } from 'vitest'

import { createMockPreferences, createMockPreferencesRepository } from '@/domain'

import { createPreferencesService } from './preferences-service'

const preferencesRepository = createMockPreferencesRepository()

const preferencesGetSpy = vi.spyOn(preferencesRepository, 'get')

const preferencesService = createPreferencesService(preferencesRepository)

beforeEach(() => {
  vi.clearAllMocks()
})

describe('PreferencesService', () => {
  it('should throw if it fails to retrieve the preferences', async () => {
    const error = new Error('Error retrieving preferences')
    preferencesGetSpy.mockRejectedValueOnce(error)

    try {
      await preferencesService.get()
    } catch (e) {
      expect(e).toBe(error)
    }
  })

  it('should return the preferences', async () => {
    const preferences = createMockPreferences()
    preferencesGetSpy.mockResolvedValueOnce(preferences)

    const result = await preferencesService.get()

    expect(result).toStrictEqual(preferences)
  })
})
