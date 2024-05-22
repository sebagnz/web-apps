import { Transaction, runTransaction as fsRunTransaction } from 'firebase/firestore'

import { getFirestoreDB } from '@/hooks/firebase'

import { TransactionManager } from '@/services'

type ExtractTail<T extends any[]> = T extends [infer _, ...infer Tail] ? Tail : never
type FSTransactionParams = Parameters<typeof fsRunTransaction>
type FSTransactionReturn = ReturnType<typeof fsRunTransaction>
type FSTransactionParamsWithoutDB = ExtractTail<FSTransactionParams>
type WrappedTransactionFn = (...params: FSTransactionParamsWithoutDB) => FSTransactionReturn

let openTransaction: Transaction | null = null

export type FirestoreTransactionManager = TransactionManager<Transaction>

export const createFirestoreTransactionManager = (): FirestoreTransactionManager => {
  const db = getFirestoreDB()

  const runTransaction: WrappedTransactionFn = (updateFn, options) => {
    return fsRunTransaction(
      db,
      async (transaction) => {
        openTransaction = transaction
        await updateFn(transaction)
        openTransaction = null
      },
      options,
    )
  }

  return { transaction: openTransaction, runTransaction }
}
