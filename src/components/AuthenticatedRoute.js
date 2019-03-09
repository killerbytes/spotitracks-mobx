import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import Loading from 'components/Loading'
import Main from 'components/Main'
import Header from './Header'
import Menu from './Menu'
import { observable } from 'mobx'

const FullSideBarLayout = styled.div`
  background: ${props => props.theme.bgDarkGray};
  .no-wrap {
    flex-wrap: nowrap;
  }
`

const MainOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
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
  }
  handleCloseMenu = () => {
    if (this.isMenu) this.isMenu = false
  }

  render() {
    const { commonStore } = this.props
    return (
      <React.Fragment>
        <Menu isMenu={this.isMenu} />
        <Main isMenu={this.isMenu} {...this.props}>
          {this.isMenu && <MainOverlay onClick={this.handleCloseMenu} />}
          <Header {...this.props} onToggle={this.handleToggleMenu} />
          <FullSideBarLayout className="content">{this.props.children}</FullSideBarLayout>
          {commonStore.isLoading && <Loading isLoading={true} />}
        </Main>
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
