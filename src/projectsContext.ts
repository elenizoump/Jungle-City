import { createContext } from 'react'

export interface ProjectInterface {
  id: string
  userName: string
  userId: string
  name: string
  cityId: string
  cityName: string
  location: string
  status: 'completed' | 'proposed' | 'in progress'
  squareMetersOfGreenery: number
}

export interface ProjectsContextInterface {
  projects: ProjectInterface[]
  addProject: (
    project: Omit<ProjectInterface, 'id' | 'userId' | 'userName' | 'cityName'>
  ) => void
}

const ProjectsContext = createContext<ProjectsContextInterface>({
  projects: [],
  addProject: () => {},
})

export default ProjectsContext
