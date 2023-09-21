import { observer } from 'mobx-react';
import BottomGradient from 'styled/BottomGradient';
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
  const { myStore, playlistStore } = useStore();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState(getInitialValues());
  const [toggle, handleToggle] = useToggle({
    playlist: false,
  });

  useEffect(() => {
    myStore.getTopTracks(range);
  }, [myStore, range]);

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
      .createPlaylistAddTracks(myStore.me.id, formValues['name'], myStore.topTracks[range].items)
      .then((res) => {
        ReactGA.event({
          category: 'Top Tracks',
          action: range,
          label: res.id,
        });

        navigate(`/playlists/${res.id}`);
      });
  };
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
            <button className="btn btn-fab" onClick={() => handleToggle({ playlist: !toggle.playlist })}>
              <i className="fas fa-check" />
            </button>
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
                <button className="btn btn-default" onClick={() => handleToggle({ playlist: !toggle.playlist })}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSubmit} disabled={!formValues['name'].length}>
                  Submit
                </button>
              </div>
            </React.Fragment>
          )}
        </Modal>
      )}
    </React.Fragment>
  );
};

export default observer(TopTracks);
