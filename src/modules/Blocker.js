import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable, toJS } from 'mobx'

@inject('myStore')
@observer
export default class Blocker extends React.Component {
  @observable playing = { item: { artists: [] } }
  @observable blocked = []
  getCurrentPlaying = () => {
    const { myStore } = this.props
    setTimeout(() => {
      myStore.getCurrentPlaying().then(res => {
        this.playing = res
        const found = this.blocked.find(i => i.item.id === this.playing.item.id)
        if (found) {
          myStore.nextTrack()
        }
        this.getCurrentPlaying()
      })
    }, 3000)
  }
  componentDidMount() {
    this.blocked = JSON.parse(localStorage.getItem('blocked')) || []
    this.getCurrentPlaying()
  }
  handleBlock = () => {
    this.blocked.push(this.playing)
    localStorage.setItem('blocked', JSON.stringify(this.blocked))
  }
  render() {
    const { is_playing, item } = this.playing
    const mappedBlocked = this.blocked.map((i, key) => {
      return (
        <li key={key}>
          {i.item.name} -{' '}
          {i.item.artists
            .map(artist => artist.name)
            .toString()
            .replace(',', ', ')}
        </li>
      )
    })
    return (
      <div>
        <strong>{item.name}</strong> <br />
        {item.artists
          .map(artist => artist.name)
          .toString()
          .replace(',', ', ')}
        <button onClick={this.handleBlock}>Block</button>
        <ul>{mappedBlocked}</ul>
      </div>
    )
  }
}
