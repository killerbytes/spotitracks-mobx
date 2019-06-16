import React from 'react'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import styled from 'styled-components'

const Container = styled.div`
  color: ${props => props.theme.lightBg2};
  position: absolute;
  bottom: 1rem;
  @media (min-width: 576px) {
    position: static;
  }

  img {
    width: 30px;
    height: 30px;
    border-radius: 100px;
    margin-right: 0.5rem;
  }
  .user {
    position: relative;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    button {
      margin-top: 0.5rem;
    }
    .fa {
      margin-left: 1rem;
    }
    a {
      cursor: pointer;
      margin-left: 0.5rem;
    }
  }
  .social-fb {
    font-size: 20px;
    color: #4267b2;
    margin-right: 1rem;
  }
`

@inject('myStore')
@observer
export default class UserBar extends React.Component {
  handleLogout = () => {
    const { myStore, history } = this.props
    myStore.removeToken()
    history.push('/')
  }

  render() {
    const {
      myStore: { me },
    } = this.props

    const Avatar = () => {
      let img = me.images.length > 0 ? me.images[0] : undefined
      if (img) {
        return <img src={img.url} alt="" />
      }
      return <img src={`https://ui-avatars.com/api/?name=${me.display_name}`} alt="" />
    }

    return (
      <Container className="user-bar">
        <div className="user">
          <a className="social-fb" href="https://www.facebook.com/Spotitracks-189230884967129/">
            <i className="fab fa-facebook" />
          </a>
          <Avatar />
          <div>
            {me.display_name}

            <a onClick={this.handleLogout} label="Sign out">
              <i className="fas fa-sign-out-alt" />
            </a>
          </div>
        </div>
      </Container>
    )
  }
}
