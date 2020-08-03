import React, {
  FunctionComponent,
  useState,
  useContext,
  FormEvent,
  ChangeEvent,
} from 'react'
import styled from 'styled-components/macro'
import WhenLoggedOut from '../components/WhenLoggedOut'
import AuthContext from '../authContext'
import { Link } from 'react-router-dom'

const StyledLogInPage = styled.div`
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  display: grid;
  justify-items: center;
  align-items: center;

  .logInContents {
    background-color: white;
    color: ${(props) => props.theme.primary.greenTextColor};
    border-radius: 10px;
    width: 50%;
    padding: 0 3% 5% 3%;
    margin-right: auto;
    margin-left: auto;
    box-sizing: border-box;

    form {
      width: 100%;
      max-width: 70%;
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
      font-weight: 700;
      text-align: center;
    }
    .gettingStarted {
      font-weight: 300;
      margin: 1.2rem 0 auto;
    }
    .individualInput {
      label {
        font-size: 1.1rem;
        font-weight: 700;
        text-align: left !important;
        display: block;
      }

      input {
        background-color: rgba(199, 238, 226, 0.3);
        margin-top: 0.3rem;
        border: none;
        border-radius: 5px;
        color: ${(props) => props.theme.primary.buttonbackgroundColor};
        font-size: 2rem;
        display: block;
        width: 100%;
      }

      input :focus {
        outline-color: ${(props) => props.theme.primary.buttonbackgroundColor};
      }
    }
  }

  button {
    background-color: ${(props) => props.theme.primary.buttonbackgroundColor};
    border: 2px ${(props) => props.theme.primary.buttonbackgroundColor};
    border-radius: 8px;
    box-sizing: border-box;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: white;
    font-size: 1.1rem;
    font-weight: 700;
  }

  h3 {
    font-weight: 500;
  }

  a {
    display: inline;
    color: ${(props) => props.theme.primary.greenTextColor};
    font-weight: 700;
  }
`

const formValid = ({ email, password }: { email: string; password: string }) =>
  email !== '' && password !== ''

const LogIn: FunctionComponent = () => {
  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const { signIn } = useContext(AuthContext)

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (formValid({ email, password })) {
      // ajax request with callback tha sets the state
      console.log(
        `Submitting form with email: ${email} and password: ${password}`
      )
      // set logged in
      // authContext.setStatus('loggedIn')
      signIn({ email, password })
    }
  }

  return (
    <WhenLoggedOut>
      <StyledLogInPage>
        <div className="logInContents">
          <h1 className="gettingStarted">welcome to</h1>
          <h1>JUNGLE CITY</h1>
          <form onSubmit={onFormSubmit}>
            <div className="individualInput">
              <label htmlFor="input-email">E-MAIL</label>
              <input
                type="email"
                id="input-email"
                name="email"
                //placeholder="Your Email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </div>
            <div className="individualInput">
              <label htmlFor="input-password">PASSWORD</label>
              <input
                type="password"
                id="input-password"
                name="password"
                //placeholder="Your password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
            </div>
            <button className="signInButton" type="submit">
              SIGN IN
            </button>
            <h3>
              Don't have an account yet?{' '}
              <Link to="/authentication/sign-un" className="get-started">
                SIGN UP
              </Link>
            </h3>
          </form>
        </div>
      </StyledLogInPage>
    </WhenLoggedOut>
  )
}

export default LogIn
