import React from 'react'
import UserBar from './UserBar'
import styled from 'styled-components'
import NavLinks from './NavLinks'

const Container = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`
export default class Header extends React.Component {
  render() {
    return (
      <Container>
        <img src="/images/logo.svg" />
        <NavLinks />
        <UserBar />
      </Container>
    )
  }
}
