import React, {
  FunctionComponent,
  useState,
  FormEvent,
  useContext,
  ChangeEvent,
} from 'react'
import MainLayout from '../layouts/MainLayout'
import styled from 'styled-components/macro'
import CitiesContext from '../citiesContext'
import ProjectsContext, { ProjectInterface } from '../projectsContext'
import CreateProjectPicture from '../images/CreateProject.png'

const StyledAddProjectForm = styled.div`
  background-image: url(${CreateProjectPicture});
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  display: grid;
  justify-items: center;
  align-items: center;

  .addProjectFormContents {
    background-color: white;
    color: ${(props) => props.theme.primary.greenTextColor};
    border-radius: 10px;
    width: 45%;
    padding: 0 3% 5% 3%;
    margin-right: auto;
    margin-left: auto;
    box-sizing: border-box;

    form {
      width: 100%;
      max-width: 75%;
      margin: 2rem auto 0 auto;
      > * {
        margin-top: 1.8rem;
        &:first-child {
          margin-top: 0;
        }
      }
    }

    h1 {
      margin-top: 0;
      font-size: 3rem;
      text-align: center;
    }
    .gettingStarted {
      font-weight: 700;
    }
    .individualInput {
      label {
        font-size: 1.1rem;
        font-weight: 700;
        text-align: left !important;
        display: block;
      }

      input,
      select {
        background-color: rgba(199, 238, 226, 0.3);
        margin-top: 0.3rem;
        border: none;
        border-radius: 5px;
        color: ${(props) => props.theme.primary.buttonbackgroundColor};
        font-size: 1.2rem;
        padding: 0.5rem 0;
        display: block;
        width: 100%;
      }
    }
  }

  button {
    background-color: ${(props) => props.theme.primary.buttonbackgroundColor};
    border: 1px solid ${(props) => props.theme.primary.buttonbackgroundColor};
    border-radius: 8px;
    box-sizing: border-box;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: white;
    font-size: 1.1rem;
    font-weight: 700;
  }

  .goBackButton {
    background-color: white;
    border: 1px solid ${(props) => props.theme.primary.buttonbackgroundColor};
    border-radius: 8px;
    box-sizing: border-box;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: ${(props) => props.theme.primary.buttonbackgroundColor};
    font-size: 1.1rem;
    font-weight: 700;
    margin-right: 2rem;
  }
`

const AddProjectForm: FunctionComponent = () => {
  const allCities = useContext(CitiesContext)
  const [name, setName] = useState('')
  const [cityId, setCityId] = useState('')
  const [location, setLocation] = useState('')
  const [status, setStatus] = useState('')
  const [squareMetersOfGreenery, setSquareMetersOfGreenery] = useState(0)
  const { addProject } = useContext(ProjectsContext)

  const formValid = () =>
    name !== '' &&
    cityId !== '' &&
    status === ('active' || 'proposed' || 'building') &&
    location !== '' &&
    squareMetersOfGreenery > 0

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (formValid()) {
      addProject({
        name,
        cityId,
        status: status as ProjectInterface['status'],
        location,
        squareMetersOfGreenery,
      })
    }
  }

  return (
    <MainLayout>
      <StyledAddProjectForm>
        <div className="addProjectFormContents">
          <form onSubmit={onFormSubmit}>
            <h1 className="gettingStarted">Add a new Project </h1>
            <div className="individualInput">
              <label htmlFor="input-name">NAME OF THE PROJECT</label>
              <input
                type="text"
                id="input-name"
                name="name"
                //placeholder="Project's Name"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
            </div>
            <div className="individualInput">
              <label htmlFor="city-select">CITY</label>
              <select
                name="city"
                id="city-select"
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setCityId(e.target.value)
                }
              >
                <option value="">Please select a city</option>
                {allCities.map(({ id: cityId, name: cityName }) => (
                  <option key={cityId} value={cityId}>
                    {cityName}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="individualInput">
              <label htmlFor="input-name">LOCATION</label>
              <input
                type="text"
                id="input-name"
                name="location"
                //placeholder="Project's Location"
                value={location}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setLocation(e.target.value)
                }
              />
            </div> */}
            <div className="individualInput">
              <label htmlFor="status-select">BUILDING STATUS</label>
              <select
                name="status"
                id="status-select"
                value={status}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setStatus(e.target.value)
                }
              >
                <option value="">Please select status</option>
                {['active', 'building', 'proposed'].map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="individualInput">
              <label htmlFor="input-password">
                m<sup>2</sup> OF GREENERY
              </label>
              <input
                type="number"
                id="input-greenery"
                name="squareMetersOfGreenery"
                placeholder="0"
                value={squareMetersOfGreenery}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSquareMetersOfGreenery(Number(e.target.value))
                }
              />
            </div>
            <button className="goBackButton" type="submit">
              GO BACK
            </button>
            <button type="submit">ADD</button>
          </form>
        </div>
      </StyledAddProjectForm>
    </MainLayout>
  )
}

export default AddProjectForm
