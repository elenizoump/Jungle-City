import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useContext,
} from 'react'
import styled from 'styled-components/macro'
import AuthContext from '../authContext'
import CitiesContext from '../citiesContext'
import { FilterManagerContext } from '../pages/AllProjects'

const StyledFilters = styled.div`
  form {
    flex-direction: row;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
`

const fuzzyMatches = ({
  searchString,
  sourceString,
}: {
  searchString: string
  sourceString: string
}): boolean => {
  const fuzzyCompatibleSearchString = searchString
    .replace(' ', '')
    .toLowerCase()

  const fuzzyCompatibleSourceString = sourceString
    .replace(' ', '')
    .toLowerCase()

  let startingIndex = 0

  const fuzzyCompatibleSearchStringArray = fuzzyCompatibleSearchString.split('')

  for (let i = 0; i < fuzzyCompatibleSearchStringArray.length; i++) {
    const foundAtIndex = fuzzyCompatibleSourceString.indexOf(
      fuzzyCompatibleSearchStringArray[i],
      startingIndex
    )

    if (foundAtIndex === -1) {
      return false
    }

    startingIndex = foundAtIndex + 1
  }

  return true
}

const Filters: FunctionComponent = () => {
  const { user } = useContext(AuthContext)
  const allCities = useContext(CitiesContext)
  const { addFilter, removeFilter } = useContext(FilterManagerContext)

  return (
    <StyledFilters>
      <form className="filters" onSubmit={(e: FormEvent) => e.preventDefault()}>
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

        <div className="individualInput">
          <input
            type="text"
            name="search-userName"
            id="search-userName"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const filterValue = e.target.value
              if (filterValue === '') {
                removeFilter('search-userName')
              } else {
                addFilter({
                  id: 'search-userName',
                  test: ({ userName }) =>
                    fuzzyMatches({
                      searchString: filterValue,
                      sourceString: userName,
                    }),
                })
              }
            }}
          />
        </div>
      </form>
    </StyledFilters>
  )
}

export default Filters
