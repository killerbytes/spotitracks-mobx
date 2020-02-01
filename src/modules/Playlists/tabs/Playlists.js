import { decorate, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import BottomGradient from '../../../styled/BottomGradient';
import PlaylistStyle from 'styled/Playlist';
import React from 'react';

class Merge extends React.Component {
  selected = [];
  handleToggle = (item) => {
    if (this.selected.indexOf(item) > -1) {
      this.selected = this.selected.filter((s) => s !== item);
    } else {
      this.selected = [...this.selected, item];
    }
  };
  handleSubmit = () => {
    const { playlistStore, myStore } = this.props;
    let tracks = [];
    let req = [];
    this.selected.forEach((playlist) => {
      req.push(playlistStore.getAllPlaylistTracks(playlist.id));
    });

    Promise.all(req).then((res) => {
      res.forEach((item) => {
        tracks = [...tracks, ...item];
      });
      playlistStore.createPlaylistAddTracks(
        myStore.me.id,
        'merge',
        tracks.map((item) => item.track)
      );
    });
  };
  render() {
    const { items } = this.props;

    const mappedPlaylists = items.map((item, key) => (
      <li key={key}>
        <Link to={`playlists/${item.id}`}>
          {item.name} <small>({item.tracks.total})</small>
        </Link>
      </li>
    ));

    return (
      <React.Fragment>
        <div className="container">
          <PlaylistStyle>{mappedPlaylists}</PlaylistStyle>
        </div>
        <BottomGradient />
      </React.Fragment>
    );
  }
}

export default inject(
  'playlistStore',
  'myStore'
)(
  observer(
    decorate(Merge, {
      selected: observable,
    })
  )
);
