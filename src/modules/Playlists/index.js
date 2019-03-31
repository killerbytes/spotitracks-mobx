import React from 'react'
import { inject, observer } from 'mobx-react'
import { toJS, observable } from 'mobx'
import Tabs from 'styled/Tabs'
import Merge from './tabs/Merge'
import Delete from './tabs/Delete'
import PlaylistTab from './tabs/Playlists'

@inject('myStore', 'playlistStore')
@observer
export default class Playlists extends React.Component {
  @observable tab = 0
  componentWillMount() {
    const { myStore } = this.props
    myStore.getPlaylists()
  }
  handleTabClick = tab => {
    this.tab = tab
  }

  handleSubmit = () => {
    const { myStore } = this.props
    myStore.getPlaylists()
  }
  render() {
    const { myStore } = this.props
    return (
      <React.Fragment>
        <Tabs>
          <nav className="container">
            <a onClick={() => this.handleTabClick(0)} className={this.tab === 0 ? 'active' : ''}>
              PLAYLISTS
              <span className="line" />
            </a>
            <a onClick={() => this.handleTabClick(1)} className={this.tab === 1 ? 'active' : ''}>
              MERGE
              <span className="line" />
            </a>
            <a onClick={() => this.handleTabClick(2)} className={this.tab === 2 ? 'active' : ''}>
              DELETE
              <span className="line" />
            </a>
          </nav>
        </Tabs>
        {this.tab == 0 && <PlaylistTab items={myStore.playlists.items} />}
        {this.tab == 1 && <Merge items={myStore.playlists.items} onSubmit={this.handleSubmit} />}
        {this.tab == 2 && <Delete items={myStore.playlists.items} onSubmit={this.handleSubmit} />}
      </React.Fragment>
    )
  }
}
