import React, { FunctionComponent, useContext } from 'react'
import MainLayout from '../layouts/MainLayout'
import styled from 'styled-components/macro'
import WhenLoggedIn from '../components/WhenLoggedIn'
import AuthContext from '../authContext'

const StyledProfilePage = styled.div`
  height: calc(100vh - 70px);
  width: 100vw;
  box-sizing: border-box;
  display: grid;
  justify-items: center;
  align-items: center;

  .userInfoWrapper {
    background-color: white;
    color: ${(props) => props.theme.primary.greenTextColor};
    border-radius: 10px;
    width: 45%;
    /* height: 90%; */
    padding: 0 3% 3% 3%;
    margin-right: auto;
    margin-left: auto;
    box-sizing: border-box;

    h1 {
      margin-top: 0;
      font-size: 2.5rem;
      text-align: center;
    }
    .gettingStarted {
      font-weight: 700;
    }
  }
`

const Profile: FunctionComponent = () => {
  const { user } = useContext(AuthContext)

  if (!user) {
    return null
  }

  const { email, firstName, lastName } = user
  const photoURL = false

  return (
    <WhenLoggedIn>
      <MainLayout>
        <StyledProfilePage>
          <div className="userInfoWrapper">
            <h1 className="gettingStarted">Profile </h1>
            <section className="CurrentUser">
              <div className="CurrentUser--profile">
                {photoURL && <img src={'#'} alt={`${firstName} ${lastName}`} />}
                <div className="CurrentUser--information">
                  <h2>{`${firstName} ${lastName}`}</h2>
                  <p className="email">{email}</p>
                </div>
              </div>
            </section>
          </div>
        </StyledProfilePage>
      </MainLayout>
    </WhenLoggedIn>
  )
}

export default Profile
