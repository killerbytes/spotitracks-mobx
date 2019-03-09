import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import NavLinks from './NavLinks'
import UserBar from './UserBar'

const Container = styled.header`
  width: 100%;
  top: 0;
  position: sticky;
  .header {
    position: relative;
    padding: 0.5rem 0;
    background: linear-gradient(180deg, #484848 0%, #181818 80.01%);
    img.logo {
      height: 34px;
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
  @media (min-width: 576px) {
    .btn-menu {
      display: none;
    }
    .menu,
    .user-bar {
      display: block;
    }
  }
`
@observer
export default class Header extends React.Component {
  render() {
    const { onToggle } = this.props
    return (
      <Container>
        <div className="header">
          <div className="container">
            <button className="btn btn-clear btn-menu" onClick={onToggle}>
              <i className="fas fa-bars" />
            </button>
            <img className="logo" src="/assets/logo.svg" />
            <NavLinks />
            <UserBar />
          </div>
        </div>
      </Container>
    )
  }
}
