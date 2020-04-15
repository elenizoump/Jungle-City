import React, { FunctionComponent } from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

const StyledIndexPage = styled.div`
  height: 100%;
  width: 100%;
  color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding: 10rem;
  .IndexContents {
    width: 50%;
    padding: 0 3%;
    margin-right: auto;
    margin-left: auto;
    box-sizing: border-box;
    text-align: center;
  }
  h1 {
    font-size: 2.5rem;
    font-weight: 500;
    margin-bottom: 4rem;
  }
  .get-started {
    background-color: ${(props) => props.theme.primary.buttonbackgroundColor};
    border: 1px solid white;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 0.5rem;
    text-decoration: none;
    color: white;
    margin-top: 10%;
  }
`

const StyledSectionP = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
`

const IndexPage: FunctionComponent = () => (
  <StyledIndexPage>
    <div className="IndexContents">
      <h1>Welcome to Jungle City</h1>
      <StyledSectionP>
        This project serves as a digital platform aiming to help the local
        Goverment reduce the Carbon Footprint of its city. The user can get an
        estimate of the C02 load the city outputs every year and the amount of
        Vertical Forrest Buildings it should construct in order to reduce the
        enviromental C02 load by 5% within a 10 years scope.
      </StyledSectionP>
    </div>
    <Link to="/authentication/log-in" className="get-started">
      Get Started!
    </Link>
  </StyledIndexPage>
)

export default IndexPage
