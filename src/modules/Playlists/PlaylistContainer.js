import { inject, observer } from 'mobx-react';
import PlaylistDetail from './PlaylistDetail';
import React from 'react';

class Playlist extends React.Component {
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const {
      match: { params },
      playlistStore,
    } = this.props;
    playlistStore.getPlaylist(params.id);
    playlistStore.getPlaylistTracks(params.id);
  };
  handleSubmit = () => {
    const { history } = this.props;
    history.push('/playlists');
  };

  render() {
    const { playlistStore } = this.props;
    return <PlaylistDetail items={playlistStore.tracks.items} onSubmit={this.handleSubmit} dupes={this.dupes} />;
  }
}

export default inject('playlistStore')(observer(Playlist));
