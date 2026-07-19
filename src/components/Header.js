import { observer } from 'mobx-react';
import Button from 'styled/Button';
import logo from 'assets/logo.svg';
import NavLinks from './NavLinks';
import React from 'react';
import styled from 'styled-components';
import UserBar from './UserBar';

class Header extends React.Component {
  render() {
    const { onToggle } = this.props;
    return (
      <Container>
        <div className="container">
          <Button className="btn-clear btn-menu" onClick={onToggle}>
            <i className="fas fa-bars" />
          </Button>
          <img alt="logo" className="logo" src={logo} />
          <NavLinks />
          <UserBar {...this.props} />
        </div>
      </Container>
    );
  }
}

export default observer(Header);

const Container = styled.header`
  z-index: 1;
  width: 100%;
  height: 50px;
  top: 0;
  position: sticky;
  padding: ${(props) => props.theme.spacing.sm} 0;
  background: linear-gradient(180deg, #484848 0%, ${(props) => props.theme.darkBg} 80.01%);
  .header {
    position: relative;
    img.logo {
      height: 30px;
    }
  }
  .btn-menu {
    margin-right: ${(props) => props.theme.spacing.md};
    font-size: 1.8rem;
  }
  .container {
    display: flex;
    align-items: center;
  }
  .menu,
  .user-bar {
    display: none;
  }
  .user-bar {
    margin-left: ${(props) => props.theme.spacing.md};
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
