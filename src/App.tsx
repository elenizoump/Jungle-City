import React, { FunctionComponent, useState, useEffect } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components/macro'
import theme from './themes'
import { Theme } from './themes/types'
import IndexPage from './pages'
import LogIn from './pages/LogIn'
import CityEmmissionsForm from './pages/CityEmmissionsForm'
import AllProjects from './pages/AllProjects'
import AddProject from './pages/AddProject'
import Profile from './pages/Profile'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import BackgroundPicture from './images/Background_Picture.png'
import AuthContext, { AuthContextInterface } from './authContext'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import LogOut from './pages/LogOut'

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

interface SignInProps {
  email: string
  password: string
}

console.log(process.env)

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
})

const App: FunctionComponent = () => {
  // const [allProjects, setallProjects] = useState([])
  const [authStatus, setAuthStatus] = useState<
    AuthContextInterface['authStatus']
  >('pending')
  const [user, setUser] = useState<AuthContextInterface['user']>(null)

  const signIn = ({ email, password }: SignInProps) => {
    setAuthStatus('pending')
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        setUser(user)
        setAuthStatus('loggedIn')
      })
  }

  const signOut = () => {
    setAuthStatus('pending')
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null)
        setAuthStatus('loggedOut')
      })
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthStatus('loggedIn')
        setUser(user)
      } else {
        setAuthStatus('loggedOut')
        setUser(null)
      }
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        authStatus,
        user,
        signIn,
        signOut,
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
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/logout">
              <LogOut />
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
