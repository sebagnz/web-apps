export { type AccountsService, createAccountsService } from './accounts/accounts-service'
export { type SnapshotsService, createSnapshotsService } from './snapshots/snapshots-service'
export { type AuthService, createAuthService } from './auth/auth-service'

export interface TransactionManager<TTransaction> {
  runTransaction: (updateFn: (transaction: TTransaction, ...args: unknown[]) => Promise<unknown>) => Promise<unknown>
  transaction: TTransaction | null
}
