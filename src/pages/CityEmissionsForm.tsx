import React, {
  FunctionComponent,
  useState,
  FormEvent,
  ChangeEvent,
  useContext,
} from 'react'
import MainLayout from '../layouts/MainLayout'
import styled from 'styled-components/macro'
import CitiesContext from '../citiesContext'
import C02production from '../images/C02production.png'

// const OFFSET_TARGET_PER_KG_OF_CO2 = 0.047794

const StyledCityEmissionsForm = styled.div`
  background-image: url(${C02production});
  background-size: cover;
  background-repeat: no-repeat;
  height: calc(100vh - 70px);
  width: 100vw;
  box-sizing: border-box;
  display: grid;
  justify-items: center;
  align-items: center;

  .cityEmissionsFormContents {
    background-color: white;
    color: ${(props) => props.theme.primary.greenTextColor};
    border-radius: 10px;
    width: 45%;
    /* height: 90%; */
    padding: 0 0% 3% 0%;
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

    h4 {
      font-weight: 500;
      text-align: center;
      margin-bottom: 2.6rem;
    }

    h1 {
      margin-top: 0;
      font-size: 2.5rem;
      text-align: center;
    }
    .gettingStarted {
      font-weight: 700;
    }

    *::placeholder {
    color: ${(props) => props.theme.primary.buttonbackgroundColor};
  }
    .individualInput :focus {
      outline-color: ${(props) => props.theme.primary.buttonbackgroundColor};
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
        padding: 0.5rem 0.3rem;
        display: block;
        width: 100%;
      }
      input,
      select :focus,
      :checked {
        outline-color: ${(props) => props.theme.primary.buttonbackgroundColor};
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

  button :focus {
    outline-color: ${(props) => props.theme.primary.buttonbackgroundColor};
  }

  button :hover {
    background-color:rgb(22 201 162);
    /* color: ${(props) => props.theme.primary.buttonbackgroundColor}; */
  }
`
const formValid = ({ city, emissions }: { city: string; emissions: number }) =>
  city !== '' && emissions !== null

const CityEmissionsForm: FunctionComponent = () => {
  const allCities = useContext(CitiesContext)
  const [cityId, setCityId] = useState('')

  const [emissions, setEmissions] = useState(0)

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault()

    // if (formValid({ city, emissions })) {
    //   // ajax request with callback tha sets the state
    //   alert(`Submitting form with city: ${city} and emissions: ${emissions}`)
    //   // set logged in
    //   // let offsetTarget = emissions * OFFSET_TARGET_PER_KG_OF_CO2
    // }
  }

  return (
    <MainLayout>
      <StyledCityEmissionsForm>
        <div className="cityEmissionsFormContents">
          <form onSubmit={onFormSubmit}>
            <h1 className="gettingStarted">
              How much C0<sub>2</sub> are you producing?
            </h1>
            <h4>
              We'll tell you how many m<sup>2</sup> you need in order to offset
              the C0<sub>2</sub> emmisions of your city by 5%
            </h4>
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
            <div className="individualInput">
              <label htmlFor="input-password">
                CO<sub>2</sub> Kg PRODUCED LAST YEAR
              </label>
              <input
                type="number"
                id="input-emissions"
                name="emissions"
                value={emissions}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmissions(Number(e.target.value))
                }
              />
            </div>

            <button type="submit">Calculate</button>
          </form>
        </div>
      </StyledCityEmissionsForm>
    </MainLayout>
  )
}

export default CityEmissionsForm
