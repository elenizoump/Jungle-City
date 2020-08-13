import React, { FunctionComponent } from 'react'
import styled from 'styled-components/macro'
import { ProjectsContextInterface } from '../projectsContext'
import Project from '../components/Project'

interface ProjectsListProps {
  projects: ProjectsContextInterface['projects']
}

const StyledProjectsList = styled.div`
  div:first-child {
    margin-top: 0;
  }
  margin-top: 15px;
  border-radius: 14px;
  padding: 0 7px 7px 7px;
  background-color: transparent;
  box-sizing: border-box;
`

const ProjectsList: FunctionComponent<ProjectsListProps> = ({ projects }) => (
  <StyledProjectsList>
    {projects.length > 0 &&
      projects.map((project) => <Project key={project.id} {...project} />)}
  </StyledProjectsList>
)

export default ProjectsList
