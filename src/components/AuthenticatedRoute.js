import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import Loading from 'styled/Loading'
import Header from './Header'

const FullSideBarLayout = styled.div`
  background: ${props => props.theme.bgDarkGray};
  .no-wrap {
    flex-wrap: nowrap;
  }
`
@inject('commonStore')
@observer
class SidebarLayout extends React.Component {
  render() {
    const { commonStore } = this.props
    return (
      <FullSideBarLayout className="container">
        <Header />
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
