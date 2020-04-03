import { createContext } from 'react'

export type AuthStatus = 'pending' | 'loggedIn' | 'loggedOut'

export interface AuthContextInterface {
  status: AuthStatus
  setStatus: (newStatus: AuthStatus) => void
}

const AuthContext = createContext<AuthContextInterface>({
  status: 'pending',
  setStatus: () => {},
})

export default AuthContext
