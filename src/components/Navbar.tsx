import React, { FunctionComponent } from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import Logo_JungleCity from '../images/Logo_JungleCity.png'

const StyledNavbar = styled.nav`
  height: 70px;
  width: 100vw;
  display: flex;
  background-color: rgba(0, 189, 147, 0.82);
  justify-content: space-between;
  font-size: 1.2rem;

  .Logo {
    height: 100%;
    width: 185px;
  }
  .logout {
    height: 100%;
    width: 106px;
  }

  a {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
    height: 100%;
    display: flex;
    align-items: center;
    color: white;
    text-align: center;
    /* padding: 14px 16px; */
    text-decoration: none;
    &:hover:not(.active) {
      background-color: #111;
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
        <Link to="/city-emmissions-form">Calculate City Emmissions</Link>
      </li>
      <li>
        <Link to="/add-project">Add a Project</Link>
      </li>
      <li>
        <Link to="/all-projects">View All Projects</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
    </ul>
    <div className="logout">
      <Link to="/logout">Sign Out</Link>
    </div>
  </StyledNavbar>
)

export default Navbar
