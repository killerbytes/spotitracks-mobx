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
  componentDidUpdate(prevProps) {
    const { playlistStore } = this.props
    // if (!playlistStore.playlist.images.length) return false
    // const IMAGE_URL = playlistStore.playlist.images[1].url
    // Vibrant.from(IMAGE_URL)
    //   .getPalette()
    //   .then(response => {
    //     console.log(response)
    //   })
    // this.items = [...playlistStore.tracks.items]
  }
  handleSubmit = () => {
    const { history } = this.props
    history.push('/playlists')
  }

  render() {
    const { playlistStore } = this.props
    return (
      <React.Fragment>
        <PlaylistDetail items={playlistStore.tracks.items} onSubmit={this.handleSubmit} dupes={this.dupes} />
      </React.Fragment>
    )
  }
}
