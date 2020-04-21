import { createContext } from 'react'

export interface ProjectInterface {
  id: string
  name: string
  cityId: string
  location: string
  status: 'active' | 'proposed' | 'building'
  squareMetersOfGreenery: number
}

export interface ProjectsContextInterface {
  projects: ProjectInterface[]
  addProject: (project: Omit<ProjectInterface, 'id'>) => void
}

const ProjectsContext = createContext<ProjectsContextInterface>({
  projects: [],
  addProject: () => {},
})

export default ProjectsContext
