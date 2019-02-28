import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable, toJS } from 'mobx'
import _TracksList from 'styled/TracksList'
import Modal from 'components/Modal'
import styled from 'styled-components'
import Page from 'styled/Page'
import ReactGA from 'react-ga'

const TracksList = styled(_TracksList)`
  li {
    display: flex;
    align-items: center;
    > div:first-child {
      width: 25px;
      display: flex;
      justify-content: center;
      margin-right: 0.8rem;
    }
    &:first-child {
      font-size: 14px;
      .circle {
        width: 25px;
        height: 25px;
        font-size: 14px;
      }
      .track {
        font-size: 18px;
      }
      .artists {
        font-size: 14px;
      }
    }
  }
  .circle {
    width: 20px;
    height: 20px;
    border: 1px solid ${props => props.theme.darkBg2};
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    color: ${props => props.theme.lightBg2};
  }
`
function getInitialValues() {
  return {
    name: 'Global Top 200',
  }
}

@inject('playlistStore', 'myStore')
@observer
export default class Charts extends React.Component {
  @observable charts = { items: [] }
  @observable formValues = getInitialValues()

  @observable modal = {
    playlist: false,
  }
  toggleModal = name => {
    this.modal[name] = !this.modal[name]
  }

  componentDidMount() {
    const { playlistStore } = this.props
    playlistStore.getCharts().then(res => {
      this.charts = res.data
    })
  }
  handleChange = e => {
    this.formValues[e.target.name] = e.target.value
  }

  handleSubmit = () => {
    const { playlistStore, myStore } = this.props
    playlistStore.createPlaylistAddTracks(myStore.me.id, this.formValues['name'], this.charts.items).then(res => {
      this.toggleModal('playlist')
      this.formValues = getInitialValues()
      ReactGA.event({
        category: 'Charts',
        action: 'create',
        label: res.id,
      })
    })
  }
  render() {
    const mappedTracks = this.charts.items.map((item, key) => {
      return (
        <li key={key}>
          <div>
            <span className="circle">{item.position}</span>
          </div>
          <div>
            <div className="track">{item.name}</div>
            <div className="artists">{item.artist}</div>
          </div>
        </li>
      )
    })

    return (
      <Page className="container">
        <div className="page-header">
          <h1>Global Top 200</h1>
        </div>
        <TracksList>{mappedTracks}</TracksList>
        {!!mappedTracks.length && (
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
      </Page>
    )
  }
}
