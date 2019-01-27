import React from 'react'
import { inject, observer } from 'mobx-react'
import { observable, toJS } from 'mobx'
import TracksList from 'styled/TracksList'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  align-items: center;
  input {
    height: auto;
    background: none;
    border: none;
    font-size: 2rem;
    color: #fff;
    border-bottom: 1px solid #fff;
    padding: 8px 10px;
    width: 100%;
    margin-bottom: 1rem;
    outline: none;
    flex: 1 1;
  }
  button {
    margin-left: 1rem;
  }
`
const title = {
  short_term: '4 Weeks',
  medium_term: '6 Months',
  long_term: 'All Time',
}

@inject('myStore', 'playlistStore')
@observer
export default class TopTracks extends React.Component {
  @observable name = ''
  componentWillMount() {
    const { myStore, range } = this.props
    myStore.getTopTracks(range)

    this.name = `Spotitracks ${title[range]}`
  }
  handleTextChange = e => {
    this.name = e.target.value
  }
  handleSubmit = e => {
    const { myStore, playlistStore, range, history } = this.props
    e.preventDefault()
    playlistStore.createPlaylistAddTracks(myStore.me.id, this.name, myStore.topTracks[range].items).then(res => {
      history.push(`/playlists/${res.id}`)
    })
  }
  render() {
    const { myStore, range } = this.props
    const mappedPlaylists = myStore.topTracks[range].items.map((item, key) => (
      <li key={key}>
        <div className="track">{item.name}</div>
        <div className="artists">
          {item.artists
            .map(artist => artist.name)
            .toString()
            .replace(',', ', ')}
        </div>
      </li>
    ))
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <input onChange={this.handleTextChange} value={this.name} />
          <button className="btn btn-primary" type="submit">
            Create Playlist
          </button>
        </Form>
        <TracksList>{mappedPlaylists}</TracksList>
      </div>
    )
  }
}
