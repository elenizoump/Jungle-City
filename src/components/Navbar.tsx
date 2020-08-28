import React, { FunctionComponent } from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import Logo_JungleCity from '../images/CustomLogo.png'
import profileNavbar from '../images/profileNavbar.png'

const StyledNavbar = styled.nav`
  /* position: fixed;
  top: 0px;
  left: 0px; */
  height: 70px;
  width: 100%;
  display: flex;
  background-color: rgb(1 144 112);
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 500;
  /* position: absolute;
  top: 0;
  left: 0; */

  .Logo {
    height: 100%;
    width: 185px;
    img {
      height: 55px;
    }
  }

  .profile {
    height: 22px;
    padding-right: 0;
  }
  .logout {
    height: 100%;
    width: 120px;
    display: flex;

    a {
      padding-left: 0;
      /* &:hover:not(.active) {
        background-color: rgba(0, 189, 147, 0.82);
      } */
    }
    .signOutbutton {
      /* border: 1px solid white; */
      border-radius: 10px;
      padding: 5px;
      &:hover:not(.active) {
        background-color: rgb(28, 125, 104);
      }
    }
  }

  a {
    font-weight: 600;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 4px;
    height: 100%;
    display: flex;
    align-items: center;
    color: white;
    text-align: center;
    /* padding: 14px 16px; */
    text-decoration: none;
    &:hover:not(.active) {
      background-color: rgb(28, 125, 104);
    }
  }

  ul.topnav {
    list-style-type: none;
    margin: 0;
    padding: 0;
    /* overflow: hidden; */
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: space-evenly;
    max-width: 600px;
  }

  ul.topnav li {
    /* float: left; */
    height: 100%;
  }

  ul.topnav li a ul.topnav li a.active {
    background-color: #4caf50;
  }

  @media screen and (max-width: 600px) {
    ul.topnav li.right,
    ul.topnav li {
      float: none;
    }
  }
`

const Navbar: FunctionComponent = () => (
  <StyledNavbar>
    <div className="Logo">
      <Link className="active" to="/">
        <img src={Logo_JungleCity} alt="Logo of JungleCity" />
      </Link>
    </div>
    <ul className="topnav">
      <li>
        <Link to="/all-projects">The Platform</Link>
      </li>
      <li>
        <Link to="/city-emissions-form">
          CO <sub>2</sub> &nbsp; Offset
        </Link>
      </li>
      <li>
        <Link to="/add-project">Add Project</Link>
      </li>

      <li>
        <div className="logout">
          <Link to="/profile">
            <img
              className="profile"
              src={profileNavbar}
              alt="Logo of JungleCity"
            />
          </Link>
          <Link to="/logout">
            <div className="signOutbutton">Sign Out</div>
          </Link>
        </div>
      </li>
    </ul>
  </StyledNavbar>
)

export default Navbar
