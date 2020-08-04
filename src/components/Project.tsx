import React, { FunctionComponent } from 'react'
import styled from 'styled-components/macro'
import { ProjectInterface } from '../projectsContext'
import buildingIcon from '../images/Building_Icon.png'

const StyledProject = styled.div`
  display: flex;
  box-shadow: 3px 2px 5px 0px rgb(147 193 189);
  flex-direction: row;
  background-color: white;
  border-radius: 9px;
  margin-top: 1.2rem;
  padding: 2%;
  @media (min-width: 1093px) {
    margin-top: 12px;
  }

  img {
    height: 100px;
    /* width: 87px; */
    margin: 0px auto;
    padding: 1px;
    border-radius: 8px;
    border: 1px solid rgb(0, 190, 147);
    @media (min-width: 1093px) {
      margin: 0px 18px;
      padding: 2px;
    }
  }
  .projectText {
    padding: 1px;
    @media (min-width: 1093px) {
      padding-left: 45px;
    }
    h5 {
      margin: 1px;
      font-weight: 400;
      span {
        font-weight: 500;
        color: rgb(9, 141, 111);
      }
    }
  }
`
interface ProjectProps extends ProjectInterface {
  cityName: string
}

const Project: FunctionComponent<ProjectProps> = ({
  cityName,
  location,
  name: projectName,
  status,
  squareMetersOfGreenery,
  userId,
  userName,
}) => (
  <StyledProject>
    <img src={buildingIcon} alt="Building Icon" />
    <div className="projectText">
      <h5>
        <span>City:</span> {cityName}
      </h5>
      <h5>
        <span>Area:</span> {location}
      </h5>
      <h5>
        <span>Building Type:</span> {projectName}
      </h5>
      <h5>
        <span>Area of Greenery:</span> {squareMetersOfGreenery}m<sup>2</sup>
      </h5>
      <h5>
        <span>Status:</span> {status}
      </h5>
      <h5 className="architect-name">
        <span>Lead Architect:</span> {userName}
      </h5>
    </div>
  </StyledProject>
)

export default Project
