import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useContext,
  // useState,
  // useEffect,
} from 'react'
import styled from 'styled-components/macro'
import AuthContext from '../authContext'
import CitiesContext from '../citiesContext'
import { FilterManagerContext } from '../pages/AllProjects'
import filter from '../images/filter.png'

const StyledFilters = styled.div`
  form {
    
  }
  /* input {
    background-color: rgba(199, 238, 226, 0.3);
    margin-top: 0.3rem;
    border: none;
    border-radius: 5px;
    color: ${(props) => props.theme.primary.buttonbackgroundColor};
    font-size: 1.2rem;
    display: block;
    width: 100%;
    padding: 0.4rem;
  } */
  label {
        font-size: 1.1rem;
        font-weight: 500;
        /* text-align: left !important; */
        /* display: inline; */
        color: ${(props) => props.theme.primary.buttonbackgroundColor};
      }

  input,
  select {
    margin: 0;
    background-color: rgba(199, 238, 226, 0.3);
    border: none;
    border-radius: 5px;
    color: ${(props) => props.theme.primary.buttonbackgroundColor};
    font-size: 1.2rem;
    padding: 0.5rem 20px;
    /* display: block; */
    /* width: 100%; */
    box-sizing: border-box;
  }

  input :focus, :checked {
    outline-color: ${(props) => props.theme.primary.buttonbackgroundColor};
  }

  #city-select {
    padding-right: 0;
  }

  #search-userName  {
    width: 120px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .individualInput {
    margin-top: 20px;
    margin-right: 40px;
    &:last-child {
      margin-right: 0;
    }
  }

  .individualInput :focus {
    outline-color: ${(props) => props.theme.primary.buttonbackgroundColor};
  }

  .checkbox-wrapper {
    display: inline-block;
    label {
      margin-left: 10px;
    }
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

// const useDebounce = (value: string, delay: number) => {
//   const [debouncedValue, setDebouncedValue] = useState(value)

//   useEffect(() => {
//     const debounceHandler = setTimeout(() => {
//       setDebouncedValue(value)
//     }, delay)
//     return () => {
//       clearTimeout(debounceHandler)
//     }
//   }, [value, delay])
//   return debouncedValue
// }

// const debouncedSearchTerm = useDebounce(searchTerm, 300)

const Filters: FunctionComponent = () => {
  const { user } = useContext(AuthContext)
  const allCities = useContext(CitiesContext)
  const { addFilter, removeFilter, changeSelectedCityId } = useContext(
    FilterManagerContext
  )

  return (
    <StyledFilters>
      <form className="filters" onSubmit={(e: FormEvent) => e.preventDefault()}>
        <img
          src={filter}
          alt="Building Icon"
          style={{ height: '20px', width: '20px', marginRight: '20px' }}
        />
        {/* <div className="individualInput"> */}
        <select
          name="city"
          id="city-select"
          className="individualInput"
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
            changeSelectedCityId(filterValue)
          }}
        >
          <option value="">All cities</option>
          {allCities.map(({ id: cityId, name: cityName }) => (
            <option key={cityId} value={cityId}>
              {cityName}
            </option>
          ))}
        </select>
        {/* </div>
        <div className="individualInput"> */}
        <input
          type="text"
          name="search-userName"
          className="individualInput"
          id="search-userName"
          placeholder="Architect"
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
        {/* </div>*/}
        <div className="individualInput checkbox-wrapper">
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
        </div>
      </form>
    </StyledFilters>
  )
}

export default Filters
