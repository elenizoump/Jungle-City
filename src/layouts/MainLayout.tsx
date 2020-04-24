import React, { FunctionComponent } from 'react'
import Navbar from '../components/Navbar'
import styled from 'styled-components/macro'

const StyledMainLayout = styled.div`
  box-sizing: border-box;
  min-height: 100vh;
  width: 100%;
  /* padding-top: 70px;
   */
`

const MainLayout: FunctionComponent = ({ children }) => (
  <StyledMainLayout>
    <Navbar />
    {children}
  </StyledMainLayout>
)

export default MainLayout
