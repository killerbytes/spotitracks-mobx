import NavLinks from './NavLinks';
import React from 'react';
import styled from 'styled-components';
import UserBar from './UserBar';

export default class Menu extends React.Component {
  render() {
    const { isMenu } = this.props;
    return (
      <MenuContainer $isMenu={isMenu}>
        <div className="container">
          <NavLinks />
          <UserBar {...this.props} />
        </div>
      </MenuContainer>
    );
  }
}

const MenuContainer = styled.div`
  background: ${(props) => props.theme.darkBg2};
  opacity: ${(props) => (props.$isMenu ? 1 : 0)};
  padding: ${(props) => props.theme.spacing.md} 0;
  position: absolute;
  width: 100%;
  height: 100vh;

  nav a {
    color: ${(props) => props.theme.lightBg};
  }
  @media (min-width: 576px) {
    display: none;
  }
`;
