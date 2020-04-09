import React, {
  FunctionComponent,
  useState,
  useEffect,
  useContext,
  FormEvent,
  ChangeEvent,
} from 'react'
import styled from 'styled-components/macro'
import WhenLoggedOut from '../components/WhenLoggedOut'
import AuthContext from '../authContext'

const StyledLogInPage = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding: 10rem;

  .logInContents {
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
      font-size: 2.5rem;
      font-weight: 800;
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

  .button {
    background-color: ${(props) => props.theme.primary.buttonbackgroundColor};
    border: 2px ${(props) => props.theme.primary.buttonbackgroundColor};
    border-radius: 10px;
    box-sizing: border-box;
    padding: 0.5rem;
    text-decoration: none;
    color: white;
    margin-top: 10%;
  }
`

// const StyledSectionP = styled.p`
//   font-size: 1rem;
//   font-weight: 400;
//   line-height: 1.5;
// `

// action="/authentication/log-in" method="POST"

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
          <form onSubmit={onFormSubmit}>
            <h1 className="gettingStarted">Getting Started</h1>
            <h1>SIGN IN</h1>
            <div className="InputContainer">
              <div className="individualInput">
                <label htmlFor="input-email">Email</label>
                <br />
                <input
                  type="email"
                  id="input-email"
                  name="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
              </div>
              <div className="individualInput">
                <label htmlFor="input-password">Password</label>
                <br />
                <input
                  type="password"
                  id="input-password"
                  name="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
              </div>
            </div>
            <button type="submit">Sign in</button>
          </form>
        </div>
      </StyledLogInPage>
    </WhenLoggedOut>
  )
}

export default LogIn
