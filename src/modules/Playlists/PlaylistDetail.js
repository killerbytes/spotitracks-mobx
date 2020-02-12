import { decorate, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import BottomGradient from '../../styled/BottomGradient';
import CoverImage from 'components/CoverImage';
import Modal from 'components/Modal';
import Page from 'styled/Page';
import React from 'react';
import ReactGA from 'react-ga';
import TracksList from 'styled/TracksList';

function getInitialValues() {
  return {
    shuffle: false,
    dedupe: false,
    name: '',
  };
}

class Tracks extends React.Component {
  hasDuplicates = false;
  dupes = [];
  items = [];
  formValues = getInitialValues();
  coverImg = null;

  modal = {
    playlist: false,
  };
  toggleModal = (name) => {
    this.modal[name] = !this.modal[name];
  };

  componentDidUpdate(prevProps) {
    const { items, playlistStore } = this.props;
    this.coverImg = playlistStore.playlist.images.reduce((i, v) => (i = v), {}).url || '';
    if (this.props.items !== prevProps.items) {
      this.items = [...items];
      this.hasDuplicates = this.getDuplicates().length ? true : false;
    }
  }

  getDuplicates = () => {
    const { playlistStore } = this.props;
    let _seen = [];
    let _dupes = [];
    playlistStore.tracks.items.map((item, index) => {
      const key = `${item.track.name}:${item.track.artists[0].name}`;
      if (_seen.filter((i) => i.track.id === item.track.id).length) {
        item.position = [index];
        const found = _dupes.find((i) => i.track.id === item.track.id);
        if (found) {
          found.position.push(index);
        } else {
          _dupes.push(item);
        }
      } else if (
        _seen.filter((i) => i.key === key && Math.abs(i.track.duration_ms - item.track.duration_ms) < 3000).length
      ) {
        item.position = [index];
        _dupes.push(item);
      } else {
        item.key = key;
        _seen.push(item);
      }
      return item;
    });
    return _dupes;
  };
  handleDuplicates = (e) => {
    this.formValues['dedupe'] = e.target.checked;

    if (this.formValues['dedupe']) {
      this.dupes = this.getDuplicates();
    } else {
      this.dupes = [];
    }
  };

  handleChange = (e) => {
    this.formValues[e.target.name] = e.target.value;
  };

  handleShuffle = (e) => {
    const { playlistStore } = this.props;
    this.formValues['shuffle'] = e.target.checked;

    if (this.formValues['shuffle']) {
      this.items = playlistStore.tracks.items
        .slice()
        .sort(function() {
          return 0.3 - Math.random();
        })
        .slice()
        .sort(function() {
          return 0.5 - Math.random();
        });
    } else {
      this.items = observable([...playlistStore.tracks.items]);
    }
  };
  handleSave = () => {
    const { playlistStore } = this.props;

    this.formValues['name'] = `${playlistStore.playlist.name} ${this.formValues['shuffle'] ? 'shuffled' : ''} ${
      this.formValues['dedupe'] ? 'deduped' : ''
    }`;
    this.toggleModal('playlist');
  };

  handleSubmit = () => {
    const { myStore, playlistStore, onSubmit } = this.props;
    const tracks = this.items.filter((item) => this.dupes.indexOf(item) === -1);

    playlistStore
      .createPlaylistAddTracks(
        myStore.me.id,
        this.formValues['name'],
        tracks.map((item) => item.track)
      )
      .then((res) => {
        this.toggleModal('playlist');
        this.dupes = [];
        ReactGA.event({
          category: 'Playlist',
          action: `${this.formValues['dedupe'] ? 'deduped|' : ''}${this.formValues['shuffle'] ? 'shuffled' : ''}`,
          label: res.id,
        });

        this.formValues = getInitialValues();

        onSubmit();
      });
  };
  render() {
    const { playlistStore } = this.props;
    const mappedTracks = this.items.map((item, key) => {
      return (
        <li key={key} className={this.dupes.indexOf(item) !== -1 ? 'is-dupe' : ''}>
          <div className="track">{item.track.name}</div>
          <div className="artists">
            {item.track.artists
              .map((artist) => artist.name)
              .toString()
              .replace(',', ', ')}
          </div>
        </li>
      );
    });
    return (
      <Page>
        <div className="page-header">
          <div className="container">
            <h1>
              <CoverImage img={this.coverImg} /> {playlistStore.playlist.name}
            </h1>
            <div className="controls">
              <label className="btn-toggle">
                <input type="checkbox" checked={this.formValues.shuffle} onChange={this.handleShuffle} />
                <div className="btn-bg btn btn-toggle">Shuffle</div>
              </label>
              {this.hasDuplicates && (
                <label className="btn-toggle">
                  <input
                    name="dedupe"
                    type="checkbox"
                    checked={this.formValues.dedupe}
                    onChange={this.handleDuplicates}
                  />
                  <div className="btn-bg btn btn-toggle">Deduplicate</div>
                </label>
              )}
            </div>
          </div>
        </div>
        <div className="container">
          <TracksList>{mappedTracks}</TracksList>
        </div>
        <BottomGradient>
          <div className="container">
            {(this.formValues['shuffle'] || this.formValues['dedupe']) && (
              <button className="btn btn-fab" onClick={this.handleSave}>
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
                  <button className="btn btn-primary" onClick={this.handleSubmit}>
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
    decorate(Tracks, {
      hasDuplicates: observable,
      dupes: observable,
      items: observable,
      formValues: observable,
      coverImg: observable,
      modal: observable,
    })
  )
);
