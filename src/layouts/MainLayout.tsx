import React, { FunctionComponent } from 'react'
import Navbar from '../components/Navbar'

const MainLayout: FunctionComponent = ({ children }) => (
  <div>
    <Navbar />
    {children}
  </div>
)

export default MainLayout
