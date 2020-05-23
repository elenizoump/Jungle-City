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
  width: 100%;
  height: 100%;
  padding: 2%;
  border-radius: 14px;
  background-color: transparent;
  box-sizing: border-box;
  overflow-y: auto;
`

const ProjectsList: FunctionComponent<ProjectsListProps> = ({ projects }) => (
  <StyledProjectsList>
    {projects.length > 0 && (
      <div>
        {projects.map((project) => (
          <Project key={project.id} {...project} />
        ))}
      </div>
    )}
  </StyledProjectsList>
)

export default ProjectsList
