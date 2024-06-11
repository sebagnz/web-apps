import { CurrencyList } from './currency'

export interface CurrenciesRepository {
  getAll: () => Promise<CurrencyList>
}
