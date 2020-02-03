import { observer } from 'mobx-react';
import logo from 'assets/logo.svg';
import NavLinks from './NavLinks';
import React from 'react';
import styled from 'styled-components';
import UserBar from './UserBar';

const Container = styled.header`
  z-index: 1;
  width: 100%;
  height: 50px;
  top: 0;
  position: sticky;
  padding: 0.5rem 0;
  background: linear-gradient(180deg, #484848 0%, #181818 80.01%);
  .header {
    position: relative;
    img.logo {
      height: 30px;
    }
  }
  .btn-menu {
    margin-right: 1rem;
    font-size: 1.8rem;
  }
  .container {
    display: flex;
    align-items: center;
  }
  .menu,
  .user-bar {
    display: none;
    font-size: 16px;
  }
  .user-bar {
    margin-left: 1rem;
    font-size: 12px;
  }
  @media (min-width: 768px) {
    .btn-menu {
      display: none;
    }
    .menu,
    .user-bar {
      display: block;
    }
  }
`;
class Header extends React.Component {
  render() {
    const { onToggle } = this.props;
    return (
      <Container>
        <div className="container">
          <button className="btn btn-clear btn-menu" onClick={onToggle}>
            <i className="fas fa-bars" />
          </button>
          <img alt="logo" className="logo" src={logo} />
          <NavLinks />
          <UserBar {...this.props} />
        </div>
      </Container>
    );
  }
}

export default observer(Header);
