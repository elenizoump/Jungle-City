import React, { FunctionComponent } from 'react'
import styled from 'styled-components/macro'
import { ProjectInterface } from '../projectsContext'
import buildingIcon from '../images/Building_Icon.png'

const StyledProject = styled.div`
  background-color: purple;
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
    <div>{cityName}</div>
    <div>{location}</div>
    <div>{projectName}</div>
    <div>{status}</div>
    <div>Lead Architect:{userName}</div>
    <div>
      {squareMetersOfGreenery}m<sup>2</sup>
    </div>
  </StyledProject>
)

export default Project
