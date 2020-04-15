import { createContext } from 'react'

export interface CityInterface {
  id: string
  name: string
  currentEmissionsPerYear: number
}

export type CitiesContextInterface = CityInterface[]

const CitiesContext = createContext<CitiesContextInterface>([])

export default CitiesContext
