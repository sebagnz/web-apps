import { User as FirebaseUser } from 'firebase/auth'

import { User } from '@/domain'

interface UserMapper {
  toDomain: (firebaseUser: FirebaseUser) => User
}

export const createUserMapper = (): UserMapper => ({
  toDomain: ({ uid, email, displayName, photoURL }) => ({
    id: uid,
    email: email,
    name: displayName,
    avatarURL: photoURL,
  }),
})
