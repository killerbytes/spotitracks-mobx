import React from 'react'
import TracksList from 'styled/TracksList'
import { observer, inject } from 'mobx-react'
import { observable, toJS } from 'mobx'
import styled from 'styled-components'
import Modal from 'components/Modal'

const PlaylistHeader = styled.div`
  h1 {
    font-size: 18px;
    font-weight: normal;
    text-align: center;
  }
  .controls {
    display: flex;
    justify-content: flex-end;
    margin: 1rem 0;
  }
`

function getInitialValues() {
  return {
    shuffle: false,
    dedupe: false,
    name: '',
  }
}

@inject('playlistStore', 'myStore')
@observer
export default class Tracks extends React.Component {
  @observable hasDuplicates = false
  @observable dupes = []
  @observable items = []
  @observable formValues = getInitialValues()

  @observable modal = {
    playlist: false,
  }
  toggleModal = name => {
    this.modal[name] = !this.modal[name]
  }

  componentDidUpdate(prevProps) {
    const { items } = this.props
    if (this.props.items !== prevProps.items) {
      this.items = [...items]
      this.hasDuplicates = this.getDuplicates().length ? true : false
    }
  }
  componentDidMount() {}

  getDuplicates = () => {
    const { playlistStore } = this.props
    let _seen = []
    let _dupes = []
    playlistStore.tracks.items.map((item, index) => {
      const key = `${item.track.name}:${item.track.artists[0].name}`
      if (_seen.filter(i => i.track.id === item.track.id).length) {
        item.position = [index]
        const found = _dupes.find(i => i.track.id === item.track.id)
        if (found) {
          found.position.push(index)
        } else {
          _dupes.push(item)
        }
      } else if (
        _seen.filter(i => {
          if (i.key === key && Math.abs(i.track.duration_ms - item.track.duration_ms) < 3000) {
            return i
          }
        }).length
      ) {
        item.position = [index]
        _dupes.push(item)
      } else {
        item.key = key
        _seen.push(item)
      }
      return item
    })
    return _dupes
  }
  handleDuplicates = e => {
    this.formValues['dedupe'] = e.target.checked

    if (this.formValues['dedupe']) {
      this.dupes = this.getDuplicates()
    } else {
      this.dupes = []
    }
  }

  handleChange = e => {
    this.formValues[e.target.name] = e.target.value
  }

  handleShuffle = e => {
    const { playlistStore } = this.props
    this.formValues['shuffle'] = e.target.checked

    if (this.formValues['shuffle']) {
      this.items = playlistStore.tracks.items
        .slice()
        .sort(function() {
          return 0.3 - Math.random()
        })
        .slice()
        .sort(function() {
          return 0.5 - Math.random()
        })
    } else {
      this.items = observable([...playlistStore.tracks.items])
    }
  }

  handleSubmit = () => {
    const { myStore, playlistStore, onSubmit } = this.props
    const tracks = this.items.filter(item => this.dupes.indexOf(item) == -1)

    playlistStore
      .createPlaylistAddTracks(myStore.me.id, this.formValues['name'], tracks.map(item => item.track))
      .then(() => {
        this.toggleModal('playlist')
        this.dupes = []
        this.formValues = getInitialValues()
        onSubmit()
      })
  }

  render() {
    const { playlistStore } = this.props
    const mappedTracks = this.items.map((item, key) => {
      return (
        <li key={key} className={this.dupes.indexOf(item) != -1 ? 'is-dupe' : ''}>
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
      <React.Fragment>
        <PlaylistHeader>
          <h1>{playlistStore.playlist.name}</h1>
          <div className="controls">
            <label className="btn btn-toggle">
              <input type="checkbox" checked={this.formValues.shuffle} onChange={this.handleShuffle} />
              <div className="btn-bg" />
              Shuffle
            </label>
            {this.hasDuplicates && (
              <label className="btn btn-toggle">
                <input
                  name="dedupe"
                  type="checkbox"
                  checked={this.formValues.dedupe}
                  onChange={this.handleDuplicates}
                />
                <div className="btn-bg" />
                Deduplicate
              </label>
            )}
            {(this.formValues['shuffle'] || this.formValues['dedupe']) && (
              <button className="btn btn-fab" onClick={() => this.toggleModal('playlist')}>
                <i className="fas fa-check" />
              </button>
            )}
          </div>
        </PlaylistHeader>

        <TracksList>{mappedTracks}</TracksList>
        {this.modal['playlist'] && (
          <Modal title={`Create Playlist`} onToggle={() => this.toggleModal('playlist')}>
            {props => (
              <React.Fragment>
                <form>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      className="form-control"
                      name="name"
                      value={this.formValues['name']}
                      onChange={this.handleChange}
                    />
                  </div>
                </form>
                <div className="form-footer">
                  <button className="btn btn-default" onClick={() => this.toggleModal('playlist')}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={this.handleSubmit}>
                    Submit
                  </button>
                </div>
              </React.Fragment>
            )}
          </Modal>
        )}
      </React.Fragment>
    )
  }
}
