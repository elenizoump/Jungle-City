import React, { FunctionComponent } from 'react'
import styled from 'styled-components/macro'
import { ProjectsContextInterface } from '../projectsContext'
import Project from '../components/Project'

interface ProjectsListProps {
  projects: ProjectsContextInterface['projects']
}

const StyledProjectsList = styled.div`
  background-color: purple;
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
