import React, {
  FunctionComponent,
  useState,
  FormEvent,
  ChangeEvent,
} from 'react'
import MainLayout from '../layouts/MainLayout'
import styled from 'styled-components/macro'

const OFFSET_TARGET_PER_KG_OF_CO2 = 0.047794

const StyledCityEmmissionsForm = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding: 10rem;

  .cityEmmissionsFormContents {
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
  city,
  emmissions,
}: {
  city: string
  emmissions: number
}) => city !== '' && emmissions !== null

const CityEmmissionsForm: FunctionComponent = () => {
  const [city, setCity] = useState('')

  const [emmissions, setEmmissions] = useState(0)

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (formValid({ city, emmissions })) {
      // ajax request with callback tha sets the state
      alert(`Submitting form with city: ${city} and emmissions: ${emmissions}`)
      // set logged in
      let offsetTarget = emmissions * OFFSET_TARGET_PER_KG_OF_CO2
    }
  }

  return (
    <MainLayout>
      <StyledCityEmmissionsForm>
        <div className="cityEmmissionsFormContents">
          <form onSubmit={onFormSubmit}>
            <h1 className="gettingStarted">
              Calculate Offset Target for City Emissions{' '}
            </h1>
            <div className="InputContainer">
              <div className="individualInput">
                <label htmlFor="input-city">City</label>
                <br />
                <input
                  type="city"
                  id="input-city"
                  name="city"
                  placeholder="City's Name"
                  value={city}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setCity(e.target.value)
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
                  id="input-emmissions"
                  name="emmissions"
                  // placeholder="City's Emmissions"
                  value={emmissions}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmmissions(Number(e.target.value))
                  }
                />
              </div>
            </div>
            <button type="submit">Calculate</button>
          </form>
        </div>
      </StyledCityEmmissionsForm>
    </MainLayout>
  )
}

export default CityEmmissionsForm
