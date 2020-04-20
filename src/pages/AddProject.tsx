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

const StyledAddProjectForm = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding: 10rem;

  .addProjectFormContents {
    background-color: rgba(255, 255, 255, 0.92);
    color: ${(props) => props.theme.primary.greenTextColor};
    border-radius: 10px;
    width: 50%;
    padding: 0 3% 5% 3%;
    margin-right: auto;
    margin-left: auto;
    box-sizing: border-box;
    text-align: center;
    h1 {
      font-size: 2rem;
      font-weight: 500;
    }
    .gettingStarted {
      font-weight: 500;
    }
    .individualInput {
      margin-bottom: 1.2rem;
      label {
        font-size: 1.2rem;
        font-weight: 500;
        margin: 1rem;
      }

      input,
      select {
        background-color: white;
        border: 1px solid rgba(28, 160, 134, 0.86);
        text-align: center;
        border-radius: 7px;
        color: grey;
        font-size: 1rem;
        margin: 0.5rem;
      }
    }
  }

  button {
    background-color: ${(props) => props.theme.primary.buttonbackgroundColor};
    border: 2px ${(props) => props.theme.primary.buttonbackgroundColor};
    border-radius: 10px;
    box-sizing: border-box;
    padding: 0.5rem;
    text-decoration: none;
    color: white;
    margin-top: 10%;
    font-size: 1rem !important;
  }
`
const formValid = ({
  name,
  city,
  status,
  squareMetersOfGreenery,
}: {
  name: string
  city: string
  status: string
  squareMetersOfGreenery: number
}) =>
  name !== '' && city !== '' && status !== '' && squareMetersOfGreenery !== null

const AddProjectForm: FunctionComponent = () => {
  const allCities = useContext(CitiesContext)
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [status, setStatus] = useState('')
  const [squareMetersOfGreenery, setSquareMetersOfGreenery] = useState(0)
  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (formValid({ name, city, status, squareMetersOfGreenery })) {
      // ajax request with callback tha sets the state
      alert(
        `Submitting form with name: ${name} and squareMetersOfGreenery: ${squareMetersOfGreenery}`
      )
      // const createProject = async () => {
      //   const projectsData = await db.collection('projects').add({
      //     name: '',
      //     location: '',
      //     city: '',
      //     status: '',
      //     squareMetersOfGreenery: 2,
      //   })
      // }
      //let offsetTarget = emissions * OFFSET_TARGET_PER_KG_OF_CO2
    }
  }
  return (
    <MainLayout>
      <StyledAddProjectForm>
        <div className="addProjectFormContents">
          <form onSubmit={onFormSubmit}>
            <h1 className="gettingStarted">Add a new Project </h1>
            <div className="InputContainer">
              <div className="individualInput">
                <label htmlFor="input-name">Select a name:</label>
                <br />
                <input
                  type="name"
                  id="input-name"
                  name="name"
                  placeholder="Project's Name"
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                />
              </div>
              <div className="individualInput">
                <label htmlFor="city-select">Select a city:</label>
                <br />
                <select
                  name="city"
                  id="city-select"
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setCity(e.target.value)
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
              <div className="individualInput">
                <label htmlFor="status-select">Select building status:</label>
                <br />
                <select
                  name="status"
                  id="status-select"
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
                  m<sup>2</sup> of greenery:
                </label>
                <br />
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
            </div>
            <button type="submit">Calculate</button>
          </form>
        </div>
      </StyledAddProjectForm>
    </MainLayout>
  )
}

export default AddProjectForm
