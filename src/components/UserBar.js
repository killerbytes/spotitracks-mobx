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
    display: flex;
    align-items: center;
    text-transform: uppercase;
    button {
      margin-top: 0.5rem;
    }
    .fa {
      margin-left: 1rem;
    }
  }
`

@inject('myStore')
@observer
export default class UserBar extends React.Component {
  handleLogout() {
    const { dispatch, history } = this.props

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
          <Avatar />
          <div>
            {me.display_name} {/* <small>
              <a onClick={this.handleLogout}>Logout</a>
            </small> */}
          </div>
        </div>
      </Container>
    )
  }
}
