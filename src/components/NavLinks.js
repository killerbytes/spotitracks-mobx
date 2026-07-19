import { NavLink } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

export default class NavLinks extends React.Component {
  render() {
    return (
      <Nav className="menu xx">
        <li>
          <NavLink to="/top-tracks">Top Tracks</NavLink>
        </li>
        {/* <li>
          <NavLink  to="/charts">
            Global Top 200
          </NavLink>
        </li> */}
        <li>
          <NavLink to="/playlists">Playlists</NavLink>
        </li>
        {/* <li>
          <NavLink  to="/blocker">
            Track Blocker
          </NavLink>
        </li> */}
      </Nav>
    );
  }
}

const Nav = styled.ul`
  list-style-type: none;
  margin: 0;
  margin-bottom: ${(props) => props.theme.spacing.md};
  padding: 0;
  font-size: ${(props) => props.theme.fontSizes.lg};
  @media (min-width: 576px) {
    margin-bottom: 0;
    margin: auto;
    li {
      display: inline-block;
    }
  }

  li {
    a {
      padding: ${(props) => props.theme.spacing.sm};
      color: ${(props) => props.theme.lightBg2};
      text-decoration: none;
      display: block;
    }
    a.active {
      color: ${(props) => props.theme.white};
    }
  }
`;
