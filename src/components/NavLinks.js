import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Nav = styled.ul`
  list-style-type: none;
  margin: 0 1rem;
  padding: 0;
  font-size: 18px;

  li {
    padding: 0.5rem;
    a {
      color: ${props => props.theme.lightBg2};
      text-decoration: none;
      display: block;
    }
    a.active {
      color: #fff;
    }
  }
`

export default class NavLinks extends React.Component {
  render() {
    return (
      <Nav>
        <li>
          <NavLink activeClassName="active" to="/top-tracks">
            Top Tracks
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/charts">
            Top 200
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/playlists">
            Playlists
          </NavLink>
        </li>
      </Nav>
    )
  }
}
