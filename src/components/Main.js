import React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { toJS, observable } from 'mobx'

const Layout = styled.main`
  transition: all 0.3s ease 0s;
  transform: ${props => (props.isMenu ? `translateX(80%)` : `unset`)};
  position: ${props => (props.isMenu ? `fixed` : `relative`)};
  width: 100%;
  header + .content {
    min-height: 100vh;
  }
  &:before {
    content: '';
    opacity: 0.5;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1;
    /* animation: AnimationName 22s ease infinite; */
    /* background: linear-gradient(129deg, #000, #545353, #2d2d2d, #484848, #545353); */
    background: ${props =>
      `linear-gradient(129deg,${props.setColor ? props.colors : `#000, #545353, #2d2d2d, #484848, #545353`})`};

    background-size: 1000% 1000%;
  }

  @keyframes AnimationName {
    0% {
      background-position: 0% 78%;
    }
    50% {
      background-position: 100% 23%;
    }
    100% {
      background-position: 0% 78%;
    }
  }
`
@inject('commonStore')
@observer
export default class Main extends React.Component {
  @observable setColor = false
  componentDidUpdate() {
    const { commonStore, match } = this.props
    const re = new RegExp('playlists/')
    if (re.test(match.path)) {
      this.setColor = true
    } else {
      this.setColor = false
    }
  }
  render() {
    const { commonStore, isMenu } = this.props

    return (
      <Layout isMenu={isMenu} setColor={this.setColor} colors={commonStore.imageColors}>
        {this.props.children}
      </Layout>
    )
  }
}
