import React from 'react'
import { inject, observer } from 'mobx-react'
import { observable, toJS } from 'mobx'
import TracksList from 'styled/TracksList'
import styled from 'styled-components'
import Modal from 'components/Modal'
import ReactGA from 'react-ga'

const Form = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  input {
    height: auto;
    background: ${props => props.theme.bgColor};
    border: none;
    font-size: 1.5rem;
    color: #fff;
    padding: 8px 10px;
    width: 100%;
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

function getInitialValues() {
  return {
    name: 'Global Top 200',
  }
}
@inject('myStore', 'playlistStore')
@observer
export default class TopTracks extends React.Component {
  @observable formValues = getInitialValues()

  @observable modal = {
    playlist: false,
  }
  toggleModal = name => {
    this.modal[name] = !this.modal[name]
  }

  componentWillMount() {
    const { myStore, range } = this.props
    myStore.getTopTracks(range)

    this.formValues['name'] = `Spotitracks ${title[range]}`
  }
  handleChange = e => {
    this.formValues[e.target.name] = e.target.value
  }

  handleSubmit = e => {
    const { myStore, playlistStore, range, history } = this.props
    e.preventDefault()
    playlistStore
      .createPlaylistAddTracks(myStore.me.id, this.formValues['name'], myStore.topTracks[range].items)
      .then(res => {
        ReactGA.event({
          category: 'Top Tracks',
          action: range,
          label: res.id,
        })

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
      <React.Fragment>
        <TracksList>{mappedPlaylists}</TracksList>
        {!!mappedPlaylists.length && (
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
                  <button
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                    disabled={!this.formValues['name'].length}
                  >
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
