import { TransactionManager } from '@/services'

export const createLocalStorageTransactionManager = (): TransactionManager<void> => {
  const runTransaction = async (fn: () => Promise<any>) => fn()
  return { runTransaction, transaction: null }
}
