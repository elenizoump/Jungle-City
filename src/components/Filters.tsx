import React, {
  FunctionComponent,
  useState,
  ChangeEvent,
  useContext,
} from 'react'
import Select from 'react-select'
import ProjectsContext from '../projectsContext'
import CitiesContext from '../citiesContext'
import styled from 'styled-components/macro'
import { FilterManagerContext } from '../pages/AllProjects'
import AuthContext from '../authContext'

const StyledFilters = styled.div`
  form {
    flex-direction: row;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
`

const Filters: FunctionComponent = () => {
  const { user } = useContext(AuthContext)
  const { projects } = useContext(ProjectsContext)
  const allCities = useContext(CitiesContext)
  const [cityId, setCityId] = useState('')
  const [userName, setUserName] = useState('')

  const usersOptions = projects.map((project) => project.userName)

  const { addFilter, removeFilter } = useContext(FilterManagerContext)

  //   import React, { Component } from 'react'
  // import Select from 'react-select'

  // const options = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' }
  // ]

  // const MyComponent = () => (
  //   <<Select options={options} />>
  // )

  // isSearchable

  return (
    <StyledFilters>
      <form className="filters">
        <div className="individualInput">
          <select
            name="city"
            id="city-select"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              const filterValue = e.target.value
              if (filterValue === '') {
                removeFilter('city-select')
              } else {
                addFilter({
                  id: 'city-select',
                  test: ({ cityId }) => cityId === filterValue,
                })
              }
            }}
          >
            <option value="">All cities</option>
            {allCities.map(({ id: cityId, name: cityName }) => (
              <option key={cityId} value={cityId}>
                {cityName}
              </option>
            ))}
          </select>
        </div>
        <div className="individualInput">
          <input
            type="checkbox"
            id="personal-projects"
            name="personal-projects"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const isChecked = e.target.checked
              console.log(isChecked)
              console.log(user?.uid)
              if (!isChecked) {
                removeFilter('personal-projects')
              } else {
                addFilter({
                  id: 'personal-projects',
                  test: ({ userId }) => (user && userId === user?.uid) || false,
                })
              }
            }}
          />
          <label htmlFor="personal-projects">My Projects</label>
          <br />
        </div>
      </form>
    </StyledFilters>
  )
}

export default Filters
