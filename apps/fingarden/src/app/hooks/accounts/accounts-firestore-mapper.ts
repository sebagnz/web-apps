import { FirestoreMapper } from '@/hooks/firebase'

import { Account, AccountSchema, User } from '@/domain'

type DBAccount = Account & { userId: User['id'] }

export const createAccountsMapper = (userId: User['id']): FirestoreMapper<DBAccount, Account> => ({
  toFirestore: (account) => ({ ...account, userId }),
  fromFirestore: (snapshot, options) => AccountSchema.parse({ id: snapshot.id, ...snapshot.data(options) }),
})
