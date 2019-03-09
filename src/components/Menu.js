import React from 'react'
import UserBar from './UserBar'
import NavLinks from './NavLinks'
import styled from 'styled-components'

const MenuContainer = styled.div`
  background: ${props => props.theme.darkBg2};
  opacity: ${props => (props.isMenu ? 1 : 0)};
  padding: 1rem 0;
  position: absolute;
  width: 100%;
  height: 100vh;

  nav a {
    color: ${props => props.theme.lightBg};
  }
  @media (min-width: 576px) {
    display: none;
  }
`

export default class Menu extends React.Component {
  render() {
    const { isMenu } = this.props
    return (
      <MenuContainer isMenu={isMenu}>
        <div className="container">
          <NavLinks />
          <UserBar />
        </div>
      </MenuContainer>
    )
  }
}
