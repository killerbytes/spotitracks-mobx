import React from 'react'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import styled from 'styled-components'

const Container = styled.div`
  margin-left: auto;
  img {
    width: 30px;
    height: 30px;
    border-radius: 100px;
    margin-right: 0.5rem;
  }
  .user {
    display: flex;
    align-items: center;
    .fa {
      margin-left: 1rem;
    }
  }
`

@inject('myStore')
@observer
export default class UserBar extends React.Component {
  componentWillMount() {
    const { myStore } = this.props
    myStore.getUser()
  }
  handleClick() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
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
          {me.display_name}
          <i className="fa fa-angle-down" />
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
