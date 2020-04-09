import React, { FunctionComponent } from 'react'
import MainLayout from '../layouts/MainLayout'
import CurrentUser from '../components/CurrentUser'

const Profile: FunctionComponent = () => (
  <MainLayout>
    <CurrentUser displayName="" photoURL="" email="" />
  </MainLayout>
)

export default Profile
