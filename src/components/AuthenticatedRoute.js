import { Route } from 'react-router-dom';

import React from 'react';
import SidebarLayout from './SidebarLayout';

export default class AuthenticatedRoute extends React.Component {
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(props) => React.createElement(SidebarLayout, props, React.createElement(Component, props))}
      />
    );
  }
}
