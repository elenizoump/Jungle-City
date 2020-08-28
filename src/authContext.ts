import { createContext } from 'react'
import type { User } from 'firebase/app'

export interface AuthContextInterface {
  authStatus: 'pending' | 'loggedIn' | 'loggedOut'
  user: User | null
  signIn: ({ email, password }: { email: string; password: string }) => void
  signOut: () => void
  signUp: ({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) => void
}

const AuthContext = createContext<AuthContextInterface>({
  authStatus: 'pending',
  user: null,
  signIn: () => {},
  signOut: () => {},
  signUp: () => {},
})

export default AuthContext
