export { type AccountsService, createAccountsService } from './accounts/accounts-service'
export { type SnapshotsService, createSnapshotsService } from './snapshots/snapshots-service'
export { type PreferencesService, createPreferencesService } from './preferences/preferences-service'
export { type AuthService, createAuthService } from './auth/auth-service'

export interface TransactionManager<TTransaction> {
  runTransaction: (updateFn: (transaction: TTransaction, ...args: unknown[]) => Promise<unknown>) => Promise<unknown>
  transaction: TTransaction | null
}

export const createMockTransactionManager = (): TransactionManager<void> => {
  const runTransaction = async (fn: () => Promise<any>) => fn()
  return { runTransaction, transaction: null }
}
