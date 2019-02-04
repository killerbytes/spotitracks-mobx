import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'
import TracksList from 'styled/TracksList'

@inject('playlistStore', 'myStore')
@observer
export default class Charts extends React.Component {
  @observable charts = { items: [] }
  componentDidMount() {
    const { playlistStore } = this.props
    playlistStore.getCharts().then(res => {
      this.charts = res.data
    })
  }
  handleSubmit = () => {
    const { playlistStore, myStore } = this.props
    playlistStore.createPlaylistAddTracks(myStore.me.id, 'testing', this.charts.items).then(res => {
      console.log(res)
    })
  }
  render() {
    const { playlistStore } = this.props
    const mappedTracks = this.charts.items.map((item, key) => {
      return (
        <li key={key}>
          <div>{item.position}</div>
          <div>
            <div className="track">{item.name}</div>
            <div className="artists">{item.artist}</div>
          </div>
        </li>
      )
    })

    return (
      <div>
        <button onClick={this.handleSubmit}>Create</button>
        <TracksList>{mappedTracks}</TracksList>
      </div>
    )
  }
}
