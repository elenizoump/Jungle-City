import React, {
  FunctionComponent,
  useState,
  useContext,
  createContext,
  useEffect,
  useReducer,
} from 'react'
import MainLayout from '../layouts/MainLayout'
import styled from 'styled-components/macro'
import ProgressBar from '../components/ProgressBar'
import ProjectsList from '../components/ProjectsList'
import Filters from '../components/Filters'
import ProjectsContext, { ProjectInterface } from '../projectsContext'
import CitiesContext from '../citiesContext'
const StyledAllProjects = styled.div`
  height: calc(100vh - 70px);
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  grid-template-rows: repeat(2, auto) 1fr;
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
    overflow-y: auto;
    grid-area: contents;
    background-color: rgba(255, 255, 255, 0.79);
    border-radius: 14px;
    /* display: flex;
    justify-content: center; */
    @media (min-width: 1093px) {
      /* height: 560px; */
    }
  }

  .mapLocation {
    grid-area: mapLocation;
    background-color: rgba(255, 255, 255, 0.79);
    border-radius: 14px;
    @media (min-width: 1093px) {
      /* height: 560px; */
    }
    .mapContents {
      width: 100%;
      height: 100%;
      padding: 2%;
      border-radius: 14px;
      background-color: transparent;
      box-sizing: border-box;
    }
  }
`
//
// let offsetTarget = emissions * OFFSET_TARGET_PER_KG_OF_CO2
//1. current emmision for city
//2. m2 per project + calc

export interface Filter {
  id: string
  test: (item: ProjectInterface) => boolean
}

export interface FilterManagerContextInterface {
  addFilter: (filter: Filter) => void
  removeFilter: (filterId: Filter['id']) => void
  changeSelectedCityId: (cityId: ProjectInterface['cityId']) => void
}

export const FilterManagerContext = createContext<
  FilterManagerContextInterface
>({
  addFilter: () => {},
  removeFilter: () => {},
  changeSelectedCityId: () => {},
})

const AllProjects: FunctionComponent = () => {
  const OFFSET_TARGET_PER_KG_OF_CO2 = 0.047794
  const { projects } = useContext(ProjectsContext)
  const cities = useContext(CitiesContext)
  const [selectedCityId, setSelectedCityId] = useState<
    ProjectInterface['cityId']
  >('')
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

  const changeSelectedCityId = (cityId: ProjectInterface['cityId']) => {
    setSelectedCityId(cityId)
  }

  const getPercentage = (): number => {
    if (!selectedCityId) {
      return -1
    }

    return (
      Math.round(
        ((projects.reduce((accumulator, project) => {
          if (project.cityId !== selectedCityId) {
            return accumulator
          }

          return accumulator + project.squareMetersOfGreenery
        }, 0) /
          (cities.find((city) => city.id === selectedCityId)
            ?.currentEmissionsPerYear ?? 1)) *
          OFFSET_TARGET_PER_KG_OF_CO2 *
          100 +
          Number.EPSILON) *
          100
      ) / 100
    )
  }

  const getMapUrl = () => {
    if (!selectedCityId) {
      return 'https://www.google.com/maps/d/embed?mid=10dow9xbJ22PIuSACp-5dU7akjCemdCzd'
    }
    return (
      cities.find((city) => city.id === selectedCityId)?.mapId ??
      'https://www.google.com/maps/d/embed?mid=10dow9xbJ22PIuSACp-5dU7akjCemdCzd'
    )
  }

  return (
    <MainLayout>
      <FilterManagerContext.Provider
        value={{ addFilter, removeFilter, changeSelectedCityId }}
      >
        <StyledAllProjects>
          <div className="header-area">
            <h1>Target: This is the target </h1>
            {console.log(getPercentage())}
            <ProgressBar amountCompleted={getPercentage()} />
          </div>
          <div className="filters-area">
            <Filters />
          </div>
          <div className="contents-area">
            <ProjectsList projects={filteredProjects()} />
          </div>
          <div className="mapLocation">
            <div className="mapContents">
              {/* <iframe
                title="googleMaps"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '10px' }}
                src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJYbIpOhmuEmsR-8e57g0qOtM&key=AIzaSyCFtohuPtbhqHCrxwKSmgCkIW7oh7dRhZA"
              /> */}
              <iframe
                title="googleMaps"
                src={getMapUrl()}
                // src="https://www.google.com/maps/d/embed?mid=14wBtrLP2Sn09lZR9oxQe0yCohPna8jEA"
                // src="https://www.google.com/maps/d/embed?mid=1XXO8angE0F_7Di_xxQUNcFFFAia0nL1-"
                // src="https://www.google.com/maps/d/embed?mid=1qXlNv-dgSGTW6E5pWe2m6YOYo32kSR0Q"
                // src="https://www.google.com/maps/d/embed?mid=10dow9xbJ22PIuSACp-5dU7akjCemdCzd"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '10px' }}
              />
            </div>
          </div>
        </StyledAllProjects>
      </FilterManagerContext.Provider>
    </MainLayout>
  )
}

export default AllProjects
