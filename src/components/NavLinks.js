import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Nav = styled.ul`
  list-style-type: none;
  margin: 0 1rem;
  padding: 0;

  li {
    display: inline-block;
    padding: 0.5rem;
    a {
      color: inherit;
      text-decoration: none;
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
          <NavLink activeClassName="active" to="/playlists">
            Playlists
          </NavLink>
        </li>
      </Nav>
    )
  }
}
