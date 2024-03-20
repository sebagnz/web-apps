import { FirestoreConverer } from '@/hooks/firebase'

import { Account, AccountSchema, User } from '@/domain'

type DBAccount = Account & { userId: User['id'] }

export const createAccountsConverter = (userId: User['id']): FirestoreConverer<DBAccount, Account> => ({
  toFirestore: (account) => ({ ...account, userId }),
  fromFirestore: (snapshot, options) => AccountSchema.parse({ id: snapshot.id, ...snapshot.data(options) }),
})
