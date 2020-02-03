import { NavLink } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

const Nav = styled.ul`
  list-style-type: none;
  margin: 0;
  margin-bottom: 1rem;
  padding: 0;
  font-size: 18px;
  @media (min-width: 576px) {
    margin-bottom: 0;
    margin: auto;
    li {
      display: inline-block;
    }
  }

  li {
    a {
      padding: 0.5rem;
      color: ${(props) => props.theme.lightBg2};
      text-decoration: none;
      display: block;
    }
    a.active {
      color: #fff;
    }
  }
`;

export default class NavLinks extends React.Component {
  render() {
    return (
      <Nav className="menu xx">
        <li>
          <NavLink activeClassName="active" to="/top-tracks">
            Top Tracks
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/charts">
            Global Top 200
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/playlists">
            Playlists
          </NavLink>
        </li>
        {/* <li>
          <NavLink activeClassName="active" to="/blocker">
            Track Blocker
          </NavLink>
        </li> */}
      </Nav>
    );
  }
}
