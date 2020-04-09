import { createContext } from 'react'
import type { User } from 'firebase/app'

export interface AuthContextInterface {
  authStatus: 'pending' | 'loggedIn' | 'loggedOut'
  user: User | null
  signIn: ({ email, password }: { email: string; password: string }) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextInterface>({
  authStatus: 'pending',
  user: null,
  signIn: () => {},
  signOut: () => {},
})

export default AuthContext
