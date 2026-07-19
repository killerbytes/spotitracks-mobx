import { observer } from 'mobx-react';
import BottomGradient from 'styled/BottomGradient';
import Button from 'styled/Button';
import Modal from 'components/Modal';
import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import TrackItem from 'components/TrackItem';
import TracksList from 'styled/TracksList';
import { useStore } from 'stores';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useToggle from 'hooks/useToggle';

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
const TopTracks = ({ range }) => {
  const { authStore, playlistStore } = useStore();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState(getInitialValues());
  const [toggle, handleToggle] = useToggle({
    playlist: false,
  });

  const getData = React.useCallback(async () => {
    await playlistStore.getTopTracks(range);
  }, [playlistStore, range]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    setFormValues({ name: `Spotitracks ${title[range]}` });
  }, [range]);

  const handleChange = (e) => {
    setFormValues({
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playlistStore
      .createPlaylistAddTracks(authStore.me.id, formValues['name'], playlistStore.topTracks[range].items)
      .then((res) => {
        ReactGA.event({
          category: 'Top Tracks',
          action: range,
          label: res.id,
        });

        navigate(`/playlists/${res.id}`);
      });
  };
  const mappedPlaylists = playlistStore.topTracks[range].items.map((item, key) => (
    <TrackItem key={key} item={item}></TrackItem>
  ));

  return (
    <React.Fragment>
      <div className="container">
        <TracksList>{mappedPlaylists}</TracksList>
      </div>
      <BottomGradient>
        <div className="container">
          {!!mappedPlaylists.length && (
            <Button className="btn-fab" onClick={() => handleToggle({ playlist: !toggle.playlist })}>
              <i className="fas fa-check" />
            </Button>
          )}
        </div>
      </BottomGradient>

      {toggle.playlist && (
        <Modal title={`Create Playlist`} onToggle={() => handleToggle({ playlist: !toggle.playlist })}>
          {() => (
            <React.Fragment>
              <form>
                <div className="form-group">
                  <label>Name</label>
                  <input className="form-control" name="name" value={formValues['name']} onChange={handleChange} />
                </div>
              </form>
              <div className="form-footer">
                <Button className="btn-default" onClick={() => handleToggle({ playlist: !toggle.playlist })}>
                  Cancel
                </Button>
                <Button className="btn-primary" onClick={handleSubmit} disabled={!formValues['name'].length}>
                  Submit
                </Button>
              </div>
            </React.Fragment>
          )}
        </Modal>
      )}
    </React.Fragment>
  );
};

export default observer(TopTracks);
