import React from 'react'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import styled from 'styled-components'

const Container = styled.div`
  margin-left: auto;
  padding: 1rem;
  color: ${props => props.theme.lightBg2};

  img {
    width: 54px;
    height: 54px;
    border-radius: 100px;
    margin-right: 0.5rem;
  }
  .user {
    display: flex;
    align-items: center;
    font-size: 16px;
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
  handleClick() {
    const { onToggleMenu } = this.props
    onToggleMenu()
  }

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
      <Container>
        <div className="user" onClick={this.handleClick}>
          <Avatar />
          <div>
            {me.display_name} <br />
            <button className="btn btn-outline">Logout</button>
          </div>
        </div>

        {/* <ul className="dropdown">
          <li>
            <a onClick={this.handleLogout}>Logout</a>
          </li>
        </ul> */}
      </Container>
    )
  }
}
