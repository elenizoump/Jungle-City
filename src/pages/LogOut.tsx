import React, { FunctionComponent, useContext, useEffect } from 'react'
import WhenLoggedIn from '../components/WhenLoggedIn'
import AuthContext from '../authContext'

const LogOut: FunctionComponent = () => {
  const { signOut } = useContext(AuthContext)

  useEffect(() => {
    signOut()
  }, [signOut])

  return <WhenLoggedIn>Logging you out</WhenLoggedIn>
}

export default LogOut
