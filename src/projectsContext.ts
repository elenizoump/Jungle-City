import { createContext } from 'react'

export interface ProjectInterface {
  id: string
  name: string
  city: string
  location: string
  status: string
  squareMetersOfGreenery: number
}

export type ProjectsContextInterface = ProjectInterface[]

const ProjectsContext = createContext<ProjectsContextInterface>([])

export default ProjectsContext
