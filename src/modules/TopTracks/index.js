import React from 'react'
import { inject, observer } from 'mobx-react'
import { toJS, observable } from 'mobx'
import TracksTab from './TracksTab'
import { SHORT_TERM, MEDIUM_TERM, LONG_TERM } from '../../constants'
import styled from 'styled-components'

const Tabs = styled.nav`
  display: flex;
  margin-bottom: 1rem;
  a {
    padding: 0.5rem 0;
    margin-right: 2rem;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-transform: uppercase;
    &.active {
      color: #fff;
      .line {
        margin-top: 5px;
        border-bottom: 2px solid ${props => props.theme.colorGreen};
        width: 2rem;
        display: inline-block;
      }
    }
  }
`

@inject('myStore')
@observer
export default class TopTracks extends React.Component {
  @observable tab = 1
  componentWillMount() {
    const { myStore } = this.props
    myStore.getTopTracks()
  }
  handleTabClick = tab => {
    this.tab = tab
  }
  render() {
    const { myStore } = this.props
    return (
      <div>
        <Tabs>
          <a onClick={() => this.handleTabClick(0)} className={this.tab === 0 ? 'active' : ''}>
            4 Weeks
            <span className="line" />
          </a>
          <a onClick={() => this.handleTabClick(1)} className={this.tab === 1 ? 'active' : ''}>
            6 Months
            <span className="line" />
          </a>
          <a onClick={() => this.handleTabClick(2)} className={this.tab === 2 ? 'active' : ''}>
            All Time
            <span className="line" />
          </a>
        </Tabs>
        {this.tab == 0 && <TracksTab range={SHORT_TERM} {...this.props} />}
        {this.tab == 1 && <TracksTab range={MEDIUM_TERM} {...this.props} />}
        {this.tab == 2 && <TracksTab range={LONG_TERM} {...this.props} />}
      </div>
    )
  }
}
