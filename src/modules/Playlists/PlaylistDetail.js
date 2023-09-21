import { observer } from 'mobx-react';
import React, { useCallback, useEffect } from 'react';
import { useStore } from 'stores';
import { useNavigate, useParams } from 'react-router-dom';
import Tracks from './Tracks';

const PlaylistDetail = () => {
  const { playlistStore } = useStore();
  const navigate = useNavigate();
  const params = useParams();

  const getData = useCallback(() => {
    playlistStore.getPlaylist(params.id);
    playlistStore.getPlaylistTracks(params.id);
  }, [params.id, playlistStore]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleSubmit = () => {
    navigate('/playlists');
  };

  return <Tracks items={playlistStore.tracks.items} onSubmit={handleSubmit} />;
};

export default observer(PlaylistDetail);
