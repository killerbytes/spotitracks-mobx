import { decorate, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import _TracksList from 'styled/TracksList';
import BottomGradient from '../styled/BottomGradient';
import Modal from 'components/Modal';
import Page from 'styled/Page';
import React from 'react';
import ReactGA from 'react-ga';
import styled from 'styled-components';
import TrackItem from 'components/TrackItem';

function getInitialValues() {
  return {
    name: 'Global Top 200',
  };
}

class Charts extends React.Component {
  charts = { items: [] };
  formValues = getInitialValues();

  modal = {
    playlist: false,
  };
  toggleModal = (name) => {
    this.modal[name] = !this.modal[name];
  };

  componentDidMount() {
    const { playlistStore } = this.props;
    playlistStore.getCharts().then((res) => {
      this.charts = res.data;
    });
  }
  handleChange = (e) => {
    this.formValues[e.target.name] = e.target.value;
  };

  handleSubmit = () => {
    const { playlistStore, myStore } = this.props;
    playlistStore.createPlaylistAddTracks(myStore.me.id, this.formValues['name'], this.charts.items).then((res) => {
      this.toggleModal('playlist');
      this.formValues = getInitialValues();
      ReactGA.event({
        category: 'Charts',
        action: 'create',
        label: res.id,
      });
    });
  };
  render() {
    const mappedTracks = this.charts.items.map(({ name, artists, position }, key) => (
      <TrackItem key={key} position={position} name={name} artists={artists} />
    ));

    return (
      <Page>
        <div className="page-header">
          <div className="container">
            <h1>Global Top 200</h1>
          </div>
        </div>
        <div className="container">
          <TracksList>{mappedTracks}</TracksList>
        </div>
        <BottomGradient>
          <div className="container">
            {!!mappedTracks.length && (
              <button className="btn btn-fab" onClick={() => this.toggleModal('playlist')}>
                <i className="fas fa-check" />
              </button>
            )}
          </div>
        </BottomGradient>

        {this.modal['playlist'] && (
          <Modal title={`Create Playlist`} onToggle={() => this.toggleModal('playlist')}>
            {() => (
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
    );
  }
}

export default inject(
  'playlistStore',
  'myStore'
)(
  observer(
    decorate(Charts, {
      charts: observable,
      formValues: observable,

      modal: observable,
    })
  )
);

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
        font-size: 20px;
      }
      .track {
        font-size: 180%;
      }
      .artists {
        font-size: 140%;
      }
    }
  }
  .circle {
    width: 20px;
    height: 20px;
    border: 1px solid ${(props) => props.theme.darkBg2};
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    color: ${(props) => props.theme.lightBg2};
  }
`;
