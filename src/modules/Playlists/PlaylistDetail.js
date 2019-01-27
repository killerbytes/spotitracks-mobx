import React from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'
import TracksList from 'styled/TracksList'
import { toJS, observable } from 'mobx'

const PlaylistHeader = styled.div`
  display: flex;
  align-items: center;
  .controls {
    margin-left: auto;
  }
`
@inject('playlistStore')
@observer
export default class Playlist extends React.Component {
  @observable isDirty = false
  @observable items = []
  componentWillMount() {
    const {
      match: { params },
      playlistStore,
      myStore,
    } = this.props
    playlistStore.getPlaylist(params.id)
    playlistStore.getPlaylistTracks(params.id)
  }
  componentDidUpdate() {
    const { playlistStore } = this.props
    this.items = toJS(playlistStore.tracks.items)
  }
  handleSortPlaylist = () => {
    const { playlistStore } = this.props
    const sorted = playlistStore.tracks.items
      .slice()
      .sort(function() {
        return 0.5 - Math.random()
      })
      .slice()
      .sort(function() {
        return 0.5 - Math.random()
      })
    playlistStore.tracks.items = sorted
    this.isDirty = true
  }
  handleShowDuplicates = () => {
    const { playlistStore } = this.props
    let seen = []
    let dupes = []

    playlistStore.tracks.items = playlistStore.tracks.items.map((item, index) => {
      const key = `${item.track.name}:${item.track.artists[0].name}`
      if (seen.filter(i => i.track.id === item.track.id).length) {
        item.position = [index]
        const found = dupes.find(i => i.track.id === item.track.id)
        if (found) {
          found.position.push(index)
        } else {
          item.isDuplicate = true
          dupes.push(item)
        }
      } else if (
        seen.filter(i => {
          if (i.key === key && Math.abs(i.track.duration_ms - item.track.duration_ms) < 3000) {
            return i
          }
        }).length
      ) {
        item.position = [index]
        item.isDuplicate = true

        dupes.push(item)
      } else {
        item.key = key
        seen.push(item)
      }
      return item
    })
    console.log(dupes)
    return dupes
  }

  render() {
    const { playlistStore } = this.props
    const mappedTracks = playlistStore.tracks.items.map((item, key) => {
      console.log(toJS(item.isDuplicate))
      return (
        <li key={key} className={item.isDuplicate ? 'is-dupe' : ''}>
          <div className="track">{item.track.name}</div>
          <div className="artists">
            {item.track.artists
              .map(artist => artist.name)
              .toString()
              .replace(',', ', ')}
          </div>
        </li>
      )
    })
    return (
      <div>
        <PlaylistHeader>
          <h1>{playlistStore.playlist.name}</h1>
          <div className="controls">
            <button className="btn" onClick={this.handleSortPlaylist}>
              Shuffle
            </button>
            <button className="btn" onClick={this.handleShowDuplicates}>
              Deduplicate
            </button>
            {this.isDirty && <button className="btn btn-primary">Save</button>}
          </div>
        </PlaylistHeader>
        <TracksList>{mappedTracks}</TracksList>
      </div>
    )
  }
}
