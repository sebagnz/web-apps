import { beforeEach, describe, expect, it, vi } from 'vitest'

import { createMockCurrenciesRepository, createMockCurrencyRatesRepository } from '@/domain'
import { createMockCurrencies, createMockCurrencyRates } from '@/domain'

import { createCurrenciesService } from './currencies-service'

const currenciesRepository = createMockCurrenciesRepository()
const currenciesGetSpy = vi.spyOn(currenciesRepository, 'getAll')

const currencyRatesRepository = createMockCurrencyRatesRepository()
const currencyRatesGetSpy = vi.spyOn(currencyRatesRepository, 'get')

const currenciesService = createCurrenciesService(currenciesRepository, currencyRatesRepository)

beforeEach(() => {
  vi.clearAllMocks()
})

describe('CurrenciesService', () => {
  it('should throw if it fails to retrieve the currencies', async () => {
    const error = new Error('Error retrieving currencies')
    currenciesGetSpy.mockRejectedValueOnce(error)

    try {
      await currenciesService.getAll()
    } catch (e) {
      expect(e).toBe(error)
    }
  })

  it('should return the currencies', async () => {
    const currencies = createMockCurrencies()
    currenciesGetSpy.mockResolvedValueOnce(currencies)

    const result = await currenciesService.getAll()

    expect(result).toStrictEqual(currencies)
  })

  it('should throw if it fails to retrieve the currency rates', async () => {
    const error = new Error('Error retrieving currency rates')
    currencyRatesGetSpy.mockRejectedValueOnce(error)

    try {
      await currenciesService.getRates('EUR', ['EUR', 'USD'])
    } catch (e) {
      expect(e).toBe(error)
    }
  })

  it('should return the currencies', async () => {
    const currencyRates = createMockCurrencyRates()
    currencyRatesGetSpy.mockResolvedValueOnce(currencyRates)

    const result = await currenciesService.getRates('EUR', ['EUR', 'USD'])

    expect(result).toStrictEqual(currencyRates)
  })
})
