import React, { FunctionComponent } from 'react'
import styled from 'styled-components/macro'
import { ProjectInterface } from '../projectsContext'
import hotelIcon from '../images/hotelIcon.png'
import profileIcon from '../images/profileIcon.png'
import locationIcon from '../images/locationIcon.png'
import growth from '../images/growth.png'

const StyledProject = styled.div<{ status: ProjectInterface['status'] }>`
  display: flex;
  box-shadow: 3px 2px 5px 0px rgb(147 193 189);
  flex-direction: row;
  background-color: white;
  border-radius: 9px;
  margin-top: 1.2rem;
  position: relative;
  padding: 2%;
  @media (min-width: 1093px) {
    margin-top: 12px;
  }
  .contents {
    display: flex;
  }
  .smallIcon {
    height: 16px;
    margin: 0;
    margin-right: 5px;
    /* width: auto; */
  }

  .bigBuildingIcon {
    position: absolute;
    left: 40px;
    top: calc(50% - 25px);
  }

  .statusContents {
    position: relative;
    width: 100px;
  }

  .projectName {
    /* position: absolute;
    top: 5px;
    left: 15px; */
    margin-top: 0;
  }

  .projectTextContents {
    text-align: left;
  }

  .statusContentsWrapper {
    width: 100px;
    position: absolute;
    right: 10px;
    top: 10px;
  }

  .statusDot {
    height: 16px;
    width: 16px;
    border: none;
    border-radius: 20px;
    position: absolute;
    top: 3px;
    left: 0;
    background-color: ${({ status }) =>
      (status === 'completed' && 'green') ||
      (status === 'in progress' && 'orange') ||
      (status === 'proposed' && 'red')};
  }
  span {
    font-weight: 500;
    position: absolute;
    left: 25px;
    color: ${({ status }) =>
      (status === 'completed' && 'green') ||
      (status === 'in progress' && 'orange') ||
      (status === 'proposed' && 'red')};
  }

  img {
    height: 50px;
    /* width: 87px; */
    margin: 0px auto;
    padding: 1px;
    /* display: inline; */

    /* border-radius: 8px; */ /* border: 1px solid rgb(0, 190, 147); */
    /* @media (min-width: 1093px) {
      margin: 0px 18px;
      padding: 2px;
    } */
  }
  h3 {
    color: ${(props) => props.theme.primary.greenTextColor};
    /* color: #217060; */
    color: #5b7470;
  }
  .projectText {
    /* position: absolute;
    top: 10px;
    left: 100px; */
    margin: 0 10% 0 35%;
    padding: 1px;
    width: fit-content;
    /* @media (min-width: 1093px) {
      padding-left: 45px;
    } */
    h4 {
      margin: 1px;
      font-weight: 400;
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
  <StyledProject status={status}>
    <img src={hotelIcon} alt="Building Icon" className="bigBuildingIcon" />
    <div className="headerElements">
      <div className="statusContentsWrapper">
        <div className="statusContents contents">
          <div className="statusDot"></div>
          <span>{status}</span>
        </div>
      </div>
    </div>
    <div className="projectText">
      <h3 className="projectName">{projectName}</h3>
      <div className="projectTextContents">
        <div className="locationContents contents">
          <img src={locationIcon} alt="Building Icon" className="smallIcon" />
          <h4>
            {location} area, {cityName}
          </h4>
        </div>
        <div className="squareMetersOfGreeneryContents contents">
          <img src={growth} alt="Building Icon" className="smallIcon" />
          <h4>
            {squareMetersOfGreenery}m<sup>2</sup>
          </h4>
        </div>

        <div className="userNameContents contents">
          <img src={profileIcon} alt="Building Icon" className="smallIcon" />

          <h4 className="architect-name">{userName}</h4>
        </div>
      </div>
    </div>
  </StyledProject>
)

export default Project
