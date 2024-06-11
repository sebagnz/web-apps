import { CurrencyCode, CurrencyRates } from './currency'

export interface CurrencyRatesRepository {
  get: (baseCurrency: CurrencyCode, currencies: Array<CurrencyCode>) => Promise<CurrencyRates>
}
