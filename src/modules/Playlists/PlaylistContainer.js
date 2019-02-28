import React from 'react'
import { inject, observer } from 'mobx-react'
import { toJS, observable } from 'mobx'
import PlaylistDetail from './PlaylistDetail'
import * as Vibrant from 'node-vibrant'

@inject('playlistStore')
@observer
export default class Playlist extends React.Component {
  @observable items = []
  componentWillMount() {
    this.getData()
  }

  getData = () => {
    const {
      match: { params },
      playlistStore,
    } = this.props
    playlistStore.getPlaylist(params.id)
    playlistStore.getPlaylistTracks(params.id)
  }
  handleSubmit = () => {
    const { history } = this.props
    history.push('/playlists')
  }

  render() {
    const { playlistStore } = this.props
    return <PlaylistDetail items={playlistStore.tracks.items} onSubmit={this.handleSubmit} dupes={this.dupes} />
  }
}
