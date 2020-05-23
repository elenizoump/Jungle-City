import React, {
  FunctionComponent,
  useState,
  useContext,
  createContext,
} from 'react'
import MainLayout from '../layouts/MainLayout'
import styled from 'styled-components/macro'
import ProgressBar from '../components/ProgressBar'
import ProjectsList from '../components/ProjectsList'
import Filters from '../components/Filters'
import ProjectsContext, { ProjectInterface } from '../projectsContext'

const StyledAllProjects = styled.div`
  height: calc(100vh - 70px);
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  grid-template-rows: 1fr 1fr 6fr;
  grid-template-areas:
    'header header '
    'filters filters '
    'contents  mapLocation';

  /* padding: 4.2rem; */
  h1 {
    margin-top: 1rem;
    color: rgb(28, 60, 53);
    font-weight: 450;
  }

  .header-area {
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
  .filters-area {
    padding: 0.5rem;
    grid-area: filters;
    background-color: rgba(255, 255, 255, 0.79);
    border-radius: 14px;
  }

  .contents-area {
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
// const OFFSET_TARGET_PER_KG_OF_CO2 = 0.047794
// let offsetTarget = emissions * OFFSET_TARGET_PER_KG_OF_CO2

export interface Filter {
  id: string
  test: (item: ProjectInterface) => boolean
}

export interface FilterManagerContextInterface {
  addFilter: (filter: Filter) => void
  removeFilter: (filterId: Filter['id']) => void
}

export const FilterManagerContext = createContext<
  FilterManagerContextInterface
>({
  addFilter: () => {},
  removeFilter: () => {},
})

const AllProjects: FunctionComponent = () => {
  const { projects } = useContext(ProjectsContext)
  const [filters, setFilters] = useState<Filter[]>([])

  const filteredProjects = () => {
    if (filters.length === 0) {
      return projects
    }

    return projects.filter((item) => filters.every(({ test }) => test(item)))
  }

  const addFilter = (filter: Filter) => {
    // Check if filter is there, if yes, replace it
    // otherwise add new filter
    const filtersCopy = [...filters]
    const existingFilter = filtersCopy.find(({ id }) => id === filter.id)

    if (existingFilter) {
      existingFilter.test = filter.test
    } else {
      filtersCopy.push(filter)
    }

    setFilters(filtersCopy)
  }

  const removeFilter = (filterId: Filter['id']) => {
    // Remove filter by id
    setFilters(filters.filter(({ id }) => id !== filterId))
  }

  return (
    <MainLayout>
      <FilterManagerContext.Provider value={{ addFilter, removeFilter }}>
        <StyledAllProjects>
          <div className="header-area">
            <h1>Target: This is the target </h1>
            <ProgressBar amountCompleted={10} />
          </div>
          <div className="filters-area">
            <Filters />
          </div>
          <div className="contents-area">
            <ProjectsList projects={filteredProjects()} />
          </div>
          <div className="mapLocation"></div>
        </StyledAllProjects>
      </FilterManagerContext.Provider>
    </MainLayout>
  )
}

export default AllProjects
