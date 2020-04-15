import React, {
  FunctionComponent,
  useState,
  FormEvent,
  ChangeEvent,
} from 'react'
import MainLayout from '../layouts/MainLayout'
import styled from 'styled-components/macro'

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

      input {
        background-color: white;
        border-color: ${(props) => props.theme.primary.buttonbackgroundColor};
        border-radius: 7px;
        color: ${(props) => props.theme.primary.buttonbackgroundColor};
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

const AddProjectForm: FunctionComponent = () =>
  null /*{
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
      // set logged in
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
                <label htmlFor="input-name"></label>
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
                <label htmlFor="city-select">Choose a pet:</label>
                <select name="pets" id="pet-select">
                  <option value="">Please select an instrument</option>
                  {[
                    'Piano',
                    'Guitar',
                    'Violin',
                    'Drums',
                    'Saxophone',
                    'Flute',
                    'Clarinet',
                    'Cello',
                    'Vocals',
                  ].map((instrumentName) => (
                    <option key={instrumentName} value={instrumentName}>
                      {instrumentName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="individualInput">
                <label htmlFor="input-name"></label>
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
                <label htmlFor="input-password">
                  kg of CO<sub>2</sub> /year
                </label>
                <br />
                <input
                  type="number"
                  id="input-emissions"
                  name="emissions"
                  // placeholder="City's Emissions"
                  value={emissions}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmissions(Number(e.target.value))
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
*/
export default AddProjectForm
