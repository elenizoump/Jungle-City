import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components/macro'
import theme from './themes'
import { Theme } from './themes/types'
import IndexPage from './pages'
import LogIn from './pages/LogIn'
import CityEmissionsForm from './pages/CityEmissionsForm'
import AllProjects from './pages/AllProjects'
import AddProject from './pages/AddProject'
import Profile from './pages/Profile'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import BackgroundPicture from './images/Background_Picture.png'
import AuthContext, { AuthContextInterface, User } from './authContext'
import CurrentUser, { CurrentUserProps } from './components/CurrentUser'
import CitiesContext, {
  CityInterface,
  CitiesContextInterface,
} from './citiesContext'
import ProjectsContext, {
  ProjectInterface,
  ProjectsContextInterface,
} from './projectsContext'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import LogOut from './pages/LogOut'
import SignUp from './pages/SignUp'

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
interface SignUpProps extends SignInProps {
  firstName: string
  lastName: string
}

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
})

const db = firebase.firestore()

const App: FunctionComponent = () => {
  const [cities, setCities] = useState<CitiesContextInterface>([])
  const [projects, setProjects] = useState<
    ProjectsContextInterface['projects']
  >([])
  const [authStatus, setAuthStatus] = useState<
    AuthContextInterface['authStatus']
  >('pending')
  const [user, setUser] = useState<AuthContextInterface['user']>(null)

  const signIn = ({ email, password }: SignInProps) => {
    setAuthStatus('pending')
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        if (user) {
          const userData = await getUserData({
            id: user.uid,
            email: user.email,
          })
          setUser(userData)
          setAuthStatus('loggedIn')
        }
      })
  }

  const signUp = ({ firstName, lastName, email, password }: SignUpProps) =>
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        if (user) {
          await db
            .collection('users')
            .add({ firstName, lastName, userId: user.uid })
        }
      })

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

  const addProject = async (
    project: Omit<ProjectInterface, 'id' | 'userId' | 'userName' | 'cityName'>
  ) => {
    if (!user) {
      return
    }
    const userDocs = await db
      .collection('users')
      .where('userId', '==', user.id)
      .get()
    await userDocs.docs[0].ref.collection('projects').add(project)
    getProjects()
  }

  const getCities = async () => {
    const citiesData = await db.collection('cities').get()
    const allCities: CityInterface[] = []

    citiesData.forEach((document) => {
      const {
        name,
        currentEmissionsPerYear,
        mapId,
      } = document.data() as CityInterface
      allCities.push({
        id: document.id,
        name,
        currentEmissionsPerYear,
        mapId,
      })
    })
    setCities(allCities)
  }

  const getUserData = async ({
    id,
    email,
  }: {
    id: firebase.User['uid']
    email: firebase.User['email']
  }): Promise<User> => {
    const { firstName, lastName } = (
      await db.collection('users').where('userId', '==', id).get()
    ).docs[0].data()

    return {
      id,
      email: email ?? '',
      firstName,
      lastName,
    }
  }

  const getProjects = useCallback(async () => {
    if (!user) {
      return
    }

    //const dbProjects = await db.collection('users').get()

    const dbProjects = await db.collectionGroup('projects').get()
    const dbUsers = await db.collection('users').get()
    const usersArray: {
      id: string
      userId: string
      firstName: string
      lastName: string
    }[] = []

    dbUsers.forEach((user) => {
      usersArray.push({
        id: user.id,
        userId: user.data().userId,
        firstName: user.data().name,
        lastName: user.data().lastName,
      })
    })

    const allProjects: ProjectInterface[] = []

    dbProjects.forEach(async (project) => {
      const {
        name,
        location,
        cityId,
        status,
        squareMetersOfGreenery,
      } = project.data() as ProjectInterface
      const owner = usersArray?.find(
        (user) => user.id === project?.ref?.parent?.parent?.id
      ) || { id: '', userId: '', firstName: '', lastName: '' }
      allProjects.push({
        id: project.id,
        userName: `${owner.firstName} ${owner.lastName}`,
        userId: owner.userId,
        name,
        location,
        cityId,
        cityName: cities.find((city) => city.id === cityId)?.name ?? '',
        status,
        squareMetersOfGreenery,
      })
    })
    setProjects(allProjects)
  }, [user, cities])

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const userData = await getUserData({ id: user.uid, email: user.email })
        setUser(userData)
        setAuthStatus('loggedIn')
      } else {
        setAuthStatus('loggedOut')
        setUser(null)
      }
    })
    getCities()

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (cities.length > 0 && user) {
      getProjects()
    }
  }, [user, cities, getProjects])

  return (
    <AuthContext.Provider
      value={{
        authStatus,
        user,
        signIn,
        signOut,
        signUp,
      }}
    >
      <CitiesContext.Provider value={cities}>
        <ProjectsContext.Provider value={{ projects, addProject }}>
          <ThemeProvider theme={theme}>
            <Router>
              <Switch>
                <Route path="/authentication/log-in">
                  <LogIn />
                </Route>
                <Route path="/authentication/sign-up">
                  <SignUp />
                </Route>
                <Route path="/city-emissions-form">
                  <CityEmissionsForm />
                </Route>
                <Route path="/all-projects">
                  <AllProjects />
                </Route>
                <Route path="/add-project">
                  <AddProject />
                </Route>
                <Route path="/profile">
                  {/* <Profile
                    // displayName={displayName}
                    // photoURL={photoURL}
                    email={email}
                  /> */}
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
        </ProjectsContext.Provider>
      </CitiesContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
