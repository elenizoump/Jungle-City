import React, { FunctionComponent, useState, useCallback } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components/macro'
import theme from './themes'
import { Theme } from './themes/types'
import IndexPage from './pages'
import LogIn from './pages/LogIn'
import CityEmmissionsForm from './pages/CityEmmissionsForm'
import AllProjects from './pages/AllProjects'
import AddProject from './pages/AddProject'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'typeface-barlow'
import BackgroundPicture from './images/Background_Picture.png'
import AuthContext, { AuthContextInterface, AuthStatus } from './authContext'

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
body {
  margin: 0;
  background-image: url(${BackgroundPicture});
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  color: ${(props) => props.theme.primary.color};
  font-family: 'Barlow', sans-serif;
}`

const App: FunctionComponent = () => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('pending')

  const setStatus = useCallback((newStatus: AuthStatus) => {
    setAuthStatus(newStatus)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        status: authStatus,
        setStatus,
      }}
    >
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/authentication/log-in">
              <LogIn />
            </Route>
            <Route path="/city-emmissions-form">
              <CityEmmissionsForm />
            </Route>
            <Route path="/all-projects">
              <AllProjects />
            </Route>
            <Route path="/add-project">
              <AddProject />
            </Route>
            <Route path="/">
              <IndexPage />
            </Route>
          </Switch>
        </Router>
        <GlobalStyle />
      </ThemeProvider>
    </AuthContext.Provider>
  )
}

export default App
