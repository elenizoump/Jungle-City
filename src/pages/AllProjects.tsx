import React, {
  FunctionComponent,
  useState,
  useContext,
  createContext,
} from 'react'
import MainLayout from '../layouts/MainLayout'
import styled from 'styled-components/macro'
import ProgressBar from '../components/ProgressBar'
import CustomProgressbar from '../components/CustomProgressbar'
import ProjectsList from '../components/ProjectsList'
import Filters from '../components/Filters'
import ProjectsContext, { ProjectInterface } from '../projectsContext'
import CitiesContext from '../citiesContext'

const StyledAllProjects = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  display: grid;
  align-items: center;
  justify-items: center;

  .title-filters {
    position: absolute;
    height: 30%;
    width: 46%;
  }

  .projects-wrapper {
    width: 95%;
    display: inline-block;
    position: relative;
  }

  /* padding: 4.2rem; */
  /* h1 {
    margin-top: 1rem;
    color: rgb(28, 60, 53);
    font-weight: 450;
    text-align: left !important;
  } */
  h1 {
    margin: 0;
    color: ${(props) => props.theme.primary.greenTextColor};
    font-weight: 700;
    text-align: left;
    font-size: 2.2rem;
  }
  .header-area {
    padding: 0.5rem;
    grid-area: header;
    /* background-color: rgba(255, 255, 255, 0.79); */
    border-radius: 14px;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .filters-area {
    /* background-color: rgba(255, 255, 255, 0.79); */
    /* border-radius: 14px; */
    /* position: absolute;
    top: 55px;
    left: 19px; */
    box-sizing: border-box;
    padding: 0 7px;
  }

  *::placeholder {
    color: ${(props) => props.theme.primary.buttonbackgroundColor};
  }
  /* 
  

  :-ms-input-placeholder {
    color: red;
  }

  ::-ms-input-placeholder {
    color: red;
  } */

  .contents-area {
    /* overflow-y: auto; */
    /* position: relative; */
    box-sizing: border-box;
    background-color: #f3f5f7;
    border-radius: 7px 0 0 7px;
    padding: 25px;
    height: calc(90vh - 70px);
    width: 50%;
    @media (min-width: 1093px) {
      /* height: 560px; */
    }
  }
  .projects {
    margin: 30px 0 0 8px;
    font-weight: 700;
    color: ${(props) => props.theme.primary.greenTextColor};
  }
  .projectsArea-wrapper {
    position: absolute;
    top: 30%;
    width: 45%;
    height: 66%;
  }
  .projectList-wrapper {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }

  .mapLocation {
    position: absolute;
    width: 50%;
    height: 100%;
    box-sizing: border-box;
    top: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.79);
    border-radius: 0 7px 7px 0;
    @media (min-width: 1093px) {
      /* height: 560px; */
    }
    .mapContents {
      width: 100%;
      height: 100%;
      border-radius: 14px;
      background-color: transparent;
      box-sizing: border-box;

      iframe {
        width: 100%;
        height: 100%;
        margin: 0;
        box-sizing: border-box;
      }
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
          <div className="projects-wrapper">
            <div className="contents-area">
              <div className="title-filters">
                <h1>DASHBOARD</h1>
                {/* <div className="header-area">
                {console.log(getPercentage())} */}
                {/* <CustomProgressbar amountCompleted={getPercentage()} /> */}
                {/* <ProgressBar amountCompleted={getPercentage()} />
              </div> */}
                <div className="filters-area">
                  <Filters />
                </div>
                <h2 className="projects">PROJECTS</h2>
              </div>
              <div className="projectsArea-wrapper">
                <div className="projectList-wrapper">
                  <ProjectsList projects={filteredProjects()} />
                </div>
              </div>
            </div>
            <div className="mapLocation">
              <div className="mapContents">
                <iframe
                  title="googleMaps"
                  src={getMapUrl()}
                  style={{ border: 0, borderRadius: '0 7px 7px 0' }}
                />
              </div>
            </div>
          </div>
        </StyledAllProjects>
      </FilterManagerContext.Provider>
    </MainLayout>
  )
}

export default AllProjects
