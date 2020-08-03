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
  padding: 2%;
  border-radius: 14px;
  background-color: transparent;
  box-sizing: border-box;
  overflow-y: auto;
`

const ProjectsList: FunctionComponent<ProjectsListProps> = ({ projects }) => (
  <StyledProjectsList>
    {projects.length > 0 &&
      projects.map((project) => <Project key={project.id} {...project} />)}
  </StyledProjectsList>
)

export default ProjectsList
