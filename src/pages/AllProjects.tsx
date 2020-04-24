import React, { FunctionComponent } from 'react'
import MainLayout from '../layouts/MainLayout'
import styled from 'styled-components/macro'
import ProgressBar from '../components/ProgressBar'

const StyledAllProjects = styled.div`
  height: calc(100vh - 70px);
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  grid-template-rows: 2fr 6fr;
  grid-template-areas:
    'header header '
    'contents  mapLocation';

  /* padding: 4.2rem; */
  h1 {
    margin-top: 1rem;
    color: rgb(28, 60, 53);
    font-weight: 450;
  }

  .header {
    padding: 0.5rem;
    grid-area: header;
    background-color: rgba(255, 255, 255, 0.79);
    border-radius: 14px;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
      margin-top: 0;
      color: rgb(28, 60, 53);
      font-weight: 450;
    }
  }

  .contents {
    grid-area: contents;
    background-color: rgba(255, 255, 255, 0.79);
    border-radius: 14px;
    display: flex;
    justify-content: center;
  }

  .mapLocation {
    grid-area: mapLocation;
    background-color: rgba(255, 255, 255, 0.79);
    border-radius: 14px;
  }
`

const AllProjects: FunctionComponent = () => (
  <MainLayout>
    <StyledAllProjects>
      <div className="header">
        <h1>Target: This is the target </h1>
        <ProgressBar amountCompleted={10} />
      </div>
      <div className="contents">
        <h1>All Projects</h1>
      </div>
      <div className="mapLocation"></div>
    </StyledAllProjects>
  </MainLayout>
)

export default AllProjects
