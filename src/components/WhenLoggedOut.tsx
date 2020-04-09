import React, { FunctionComponent, useContext, ReactNode } from 'react'
import { Redirect } from 'react-router-dom'
import AuthContext from '../authContext'
import Pending from './Pending'

interface WhenLoggedOutProps {
  children: ReactNode
}

const WhenLoggedOut: FunctionComponent<WhenLoggedOutProps> = ({ children }) => {
  const { authStatus } = useContext(AuthContext)

  switch (authStatus) {
    case 'pending':
      return <Pending />
    case 'loggedIn':
      return <Redirect to="/all-projects" />
    case 'loggedOut':
      return <>{children}</>
    default:
      return null
  }
}

export default WhenLoggedOut
