import React, { FunctionComponent } from 'react'
import styled from 'styled-components/macro'

const StyledIndexPage = styled.div`
  p {
    font-size: 36px;
  }
`

const StyledSectionP = styled.p`
  font-size: 36px;
`

const IndexPage: FunctionComponent = () => (
  <StyledIndexPage>
    <div className="container-fluid">
      <h1>Welcome to Jungle City</h1>
      <StyledSectionP>
        This project serves as a digital platform aiming to help the local
        Goverment reduce the Carbon Footprint of its city. The user can get an
        estimate of the C02 load the city outputs every year and the amount of
        Vertical Forrest Buildings it should construct in order to reduce the
        enviromental C02 load by 5% within a 10 years scope.
      </StyledSectionP>
    </div>
    <button className="get-started">
      <a href="/authentication/sign-in">Get Started!</a>
    </button>
  </StyledIndexPage>
)

export default IndexPage
