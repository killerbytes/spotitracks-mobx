import React from 'react'
import { inject, observer } from 'mobx-react'
import { toJS, observable } from 'mobx'
import TracksTab from './TracksTab'
import { SHORT_TERM, MEDIUM_TERM, LONG_TERM } from '../../constants'
import Tabs from 'styled/Tabs'
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
    return (
      <React.Fragment>
        <Tabs>
          <nav className="container">
            <a onClick={() => this.handleTabClick(0)} className={this.tab === 0 ? 'active' : ''}>
              SHORT
              <span className="line" />
            </a>
            <a onClick={() => this.handleTabClick(1)} className={this.tab === 1 ? 'active' : ''}>
              MEDIUM
              <span className="line" />
            </a>
            <a onClick={() => this.handleTabClick(2)} className={this.tab === 2 ? 'active' : ''}>
              ALL TIME
              <span className="line" />
            </a>
          </nav>
        </Tabs>
        <div className="container">
          {this.tab == 0 && <TracksTab range={SHORT_TERM} {...this.props} />}
          {this.tab == 1 && <TracksTab range={MEDIUM_TERM} {...this.props} />}
          {this.tab == 2 && <TracksTab range={LONG_TERM} {...this.props} />}
        </div>
      </React.Fragment>
    )
  }
}
