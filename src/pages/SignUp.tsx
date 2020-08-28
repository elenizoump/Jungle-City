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
import { Link, Redirect } from 'react-router-dom'

const StyledSignUpPage = styled.div`
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  display: grid;
  justify-items: center;
  align-items: center;

  .SignUpContents {
    background-color: white;
    color: ${(props) => props.theme.primary.greenTextColor};
    border-radius: 10px;
    width: 40%;
    /* height: 60%; */
    padding: 1% 3%;
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
      margin: 0;
      /* margin: 1.2rem 0 auto; */
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
        font-size: 1.2rem;
        display: block;
        width: 100%;
        padding: 0.6rem;
      }

      input :focus {
        outline-color: #6ecab1;
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
  button :focus {
    outline: none;
    border: 2px solid #88d9c5;
    border-radius: 8px;
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

const formValid = ({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string
  lastName: string
  email: string
  password: string
}) => firstName !== '' && lastName !== '' && email !== '' && password !== ''

const SignUp: FunctionComponent = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accountCreated, setAccountCreated] = useState(false)

  const { signUp } = useContext(AuthContext)

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (formValid({ firstName, lastName, email, password })) {
      // ajax request with callback tha sets the state

      // set logged in
      // authContext.setStatus('loggedIn')
      await signUp({ firstName, lastName, email, password })
      setAccountCreated(true)
    }
  }

  if (accountCreated) {
    return <Redirect to="/sign-in" />
  }

  return (
    <WhenLoggedOut>
      <StyledSignUpPage>
        <div className="SignUpContents">
          <h1 className="gettingStarted">welcome to</h1>
          <h1>JUNGLE CITY</h1>
          <form onSubmit={onFormSubmit}>
            <div className="individualInput">
              <label htmlFor="input-userName">FIRST NAME</label>
              <input
                type="firstName"
                id="input-firstName"
                name="firstName"
                //placeholder="Your Email"
                value={firstName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFirstName(e.target.value)
                }
              />
              <label htmlFor="input-userName">LAST NAME</label>
              <input
                type="lastName"
                id="input-lastName"
                name="lastName"
                //placeholder="Your Email"
                value={lastName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setLastName(e.target.value)
                }
              />
            </div>
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
              SIGN UP
            </button>
            <h3>
              Already have an account?{' '}
              <Link to="/authentication/sign-in" className="get-started">
                SIGN IN
              </Link>
            </h3>
          </form>
        </div>
      </StyledSignUpPage>
    </WhenLoggedOut>
  )
}

export default SignUp
