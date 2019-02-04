import React from 'react'
import PlaylistStyle from 'styled/Playlist'
import { observable, toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import CheckBox from 'components/CheckBox'
import Modal from 'components/Modal'

function getInitialState() {
  return {
    name: '',
  }
}
@inject('playlistStore', 'myStore')
@observer
export default class Merge extends React.Component {
  @observable selected = []
  @observable formValues = getInitialState()
  @observable modal = {
    playlist: false,
  }
  toggleModal = name => {
    this.modal[name] = !this.modal[name]
  }

  handleToggle = item => {
    if (this.selected.indexOf(item) > -1) {
      this.selected = this.selected.filter(s => s !== item)
    } else {
      this.selected = [...this.selected, item]
    }
  }
  handleChange = e => {
    this.formValues[e.target.name] = e.target.value
  }
  handleSubmit = () => {
    const { onSubmit, onToggle } = this.props
    const { playlistStore, myStore } = this.props
    let tracks = []
    let promises = []
    this.selected.forEach(playlist => {
      promises.push(playlistStore.getAllPlaylistTracks(playlist.id))
    })

    Promise.all(promises).then(res => {
      res.forEach(item => {
        tracks = [...tracks, ...item]
      })
      playlistStore
        .createPlaylistAddTracks(myStore.me.id, this.formValues['name'], tracks.map(item => item.track))
        .then(() => {
          onSubmit()
          this.toggleModal('playlist')
          this.selected = []
          this.formValues = getInitialState()
        })
    })
  }

  render() {
    const { items, onSubmit } = this.props

    const mappedPlaylists = items.map((item, key) => (
      <li key={key}>
        <CheckBox checked={this.selected.indexOf(item) > -1} onChange={() => this.handleToggle(item)}>
          {item.name} <small>({item.tracks.total})</small>
        </CheckBox>
      </li>
    ))
    return (
      <React.Fragment>
        <PlaylistStyle>{mappedPlaylists}</PlaylistStyle>
        {this.selected.length > 1 && (
          <button className="btn btn-fab" onClick={() => this.toggleModal('playlist')}>
            <i className="fas fa-check" />
          </button>
        )}
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
