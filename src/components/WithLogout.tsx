import React, {
  FunctionComponent,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react'
import { Redirect } from 'react-router-dom'
import AuthContext from '../authContext'

interface WithLogoutProps {
  children: ReactNode
}

const WithLogout: FunctionComponent<WithLogoutProps> = ({ children }) => {
  const authContext = useContext(AuthContext)

  const [loginStatus, setLoginStatus] = useState(authContext.status)

  useEffect(() => {
    setLoginStatus(authContext.status)
  }, [authContext.status])

  useEffect(() => {
    setTimeout(() => {
      authContext.setStatus('loggedOut')
    }, 3000)
  }, [])

  switch (loginStatus) {
    case 'pending':
      return <h1>Loading...</h1>
    case 'loggedIn':
      return <Redirect to="/all-projects" />
    case 'loggedOut':
      return <>{children}</>
    default:
      return null
  }
}

export default WithLogout
