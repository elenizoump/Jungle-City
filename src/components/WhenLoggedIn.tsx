import React, { FunctionComponent, useContext, ReactNode } from 'react'
import { Redirect } from 'react-router-dom'
import AuthContext from '../authContext'
import Pending from './Pending'

interface WhenLoggedInProps {
  children: ReactNode
}

const WhenLoggedIn: FunctionComponent<WhenLoggedInProps> = ({ children }) => {
  const { authStatus } = useContext(AuthContext)

  switch (authStatus) {
    case 'pending':
      return <Pending />
    case 'loggedIn':
      return <>{children}</>
    case 'loggedOut':
      return <Redirect to="/authentication/log-in" />
    default:
      return null
  }
}

export default WhenLoggedIn
