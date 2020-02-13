import { decorate, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import BottomGradient from 'styled/BottomGradient';
import Modal from 'components/Modal';
import React from 'react';
import ReactGA from 'react-ga';
import TrackItem from 'components/TrackItem';
import TracksList from 'styled/TracksList';

const title = {
  short_term: '4 Weeks',
  medium_term: '6 Months',
  long_term: 'All Time',
};

function getInitialValues() {
  return {
    name: 'Global Top 200',
  };
}
class TopTracks extends React.Component {
  formValues = getInitialValues();
  modal = {
    playlist: false,
  };
  toggleModal = (name) => {
    this.modal[name] = !this.modal[name];
  };

  componentDidMount() {
    const { myStore, range } = this.props;
    myStore.getTopTracks(range);

    this.formValues['name'] = `Spotitracks ${title[range]}`;
  }
  handleChange = (e) => {
    this.formValues[e.target.name] = e.target.value;
  };

  handleSubmit = (e) => {
    const { myStore, playlistStore, range, history } = this.props;
    e.preventDefault();
    playlistStore
      .createPlaylistAddTracks(myStore.me.id, this.formValues['name'], myStore.topTracks[range].items)
      .then((res) => {
        ReactGA.event({
          category: 'Top Tracks',
          action: range,
          label: res.id,
        });

        history.push(`/playlists/${res.id}`);
      });
  };
  render() {
    const { myStore, range } = this.props;
    const mappedPlaylists = myStore.topTracks[range].items.map(({ name, artists }, key) => (
      <TrackItem key={key} name={name} artists={artists}></TrackItem>
    ));
    return (
      <React.Fragment>
        <div className="container">
          <TracksList>{mappedPlaylists}</TracksList>
        </div>
        <BottomGradient>
          <div className="container">
            {!!mappedPlaylists.length && (
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
      </React.Fragment>
    );
  }
}

export default inject(
  'myStore',
  'playlistStore'
)(
  withRouter(
    observer(
      decorate(TopTracks, {
        formValues: observable,
        modal: observable,
      })
    )
  )
);
