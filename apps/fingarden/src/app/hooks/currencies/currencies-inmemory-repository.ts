import { CurrenciesRepository } from '@/domain'

export const createCurrenciesRepository = (): CurrenciesRepository => {
  const getAll = async () => {
    return {
      USD: { code: 'USD', name: 'US Dollar', symbol: '$', icon: '💵' },
      EUR: { code: 'EUR', name: 'Euro', symbol: '€', icon: '💶' },
    } as const
  }

  return { getAll }
}
