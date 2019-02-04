import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import Loading from 'styled/Loading'
import Header from './Header'
import NavLinks from './NavLinks'
import UserBar from './UserBar'
import { observable } from 'mobx'

const FullSideBarLayout = styled.div`
  background: ${props => props.theme.bgDarkGray};
  .no-wrap {
    flex-wrap: nowrap;
  }
`
const MenuContainer = styled.div`
  background: ${props => props.theme.darkBg2};
  position: fixed;
  top: 72px;
  width: 100%;
  height: 100%;
  nav a {
    color: ${props => props.theme.lightBg};
  }
`
@inject('commonStore', 'myStore')
@observer
class SidebarLayout extends React.Component {
  @observable isMenu = false
  componentWillMount() {
    const { myStore } = this.props
    myStore.getUser()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.isMenu = false
    }
  }
  handleToggleMenu = () => {
    this.isMenu = !this.isMenu
    console.log(this.isMenu)
  }

  render() {
    const { commonStore } = this.props
    return (
      <React.Fragment>
        <Header onToggle={this.handleToggleMenu} />
        <FullSideBarLayout className="container">
          <div className="row h-100 no-wrap">
            <div className="col-sm main">
              <div>{this.props.children}</div>
            </div>
          </div>
          {commonStore.isLoading && (
            <Loading className="fullscreen">
              <span>
                <i className="fa fa-spinner fa-spin" />
              </span>
            </Loading>
          )}
        </FullSideBarLayout>
        {this.isMenu && (
          <MenuContainer>
            <UserBar />
            <NavLinks />
          </MenuContainer>
        )}
      </React.Fragment>
    )
  }
}

export default class AuthenticatedRoute extends React.Component {
  render() {
    const { component: Component, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={props => React.createElement(SidebarLayout, props, React.createElement(Component, props))}
      />
    )
  }
}
