import React from 'react'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #2d2d2d;
    display: flex;
    a {
      color: inherit;
      text-decoration: none;
    }
    span {
      margin-left: auto;
    }
  }
`

@inject('myStore', 'playlistStore')
@observer
export default class Playlists extends React.Component {
  componentWillMount() {
    const { myStore } = this.props
    myStore.getPlaylists()
  }
  handleDeletePlaylist = item => {
    const { myStore, playlistStore } = this.props
    playlistStore.deletePlaylist(item.id).then(() => {
      myStore.playlists.items.remove(item)
    })
  }
  render() {
    const { myStore } = this.props
    const mappedPlaylists = myStore.playlists.items.map((item, key) => (
      <li key={key}>
        <Link to={`playlists/${item.id}`}>
          {item.name} <small>({item.tracks.total})</small>
        </Link>
        <span>
          <a onClick={() => this.handleDeletePlaylist(item)}>
            <i className="fa fa-trash" />
          </a>
        </span>
      </li>
    ))
    return (
      <div>
        <List>{mappedPlaylists}</List>
      </div>
    )
  }
}
