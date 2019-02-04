import React from 'react'
import UserBar from './UserBar'
import styled from 'styled-components'
import NavLinks from './NavLinks'
import { observer } from 'mobx-react'

const Container = styled.header`
  padding: 1rem 0;
  background: linear-gradient(180deg, #484848 0%, #181818 80.01%);
  .container {
    display: flex;
    align-items: center;
  }
  img {
    height: 40px;
  }
  .menu {
    margin-left: auto;
    font-size: 1.2rem;
  }
`
@observer
export default class Header extends React.Component {
  render() {
    const { onToggle } = this.props
    return (
      <Container>
        <div className="container">
          <img src="/assets/logo.svg" />
          <button className="btn btn-clear menu" onClick={onToggle}>
            <i className="fas fa-bars" />
          </button>
        </div>
      </Container>
    )
  }
}
