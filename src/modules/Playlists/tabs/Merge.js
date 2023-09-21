import BottomGradient from '../../../styled/BottomGradient';
import CheckBox from 'components/CheckBox';
import Modal from 'components/Modal';
import PlaylistStyle from 'styled/Playlist';
import React, { useState } from 'react';
import ReactGA from 'react-ga';
import { useStore } from 'stores';
import useToggle from 'hooks/useToggle';

function getInitialState() {
  return {
    name: 'Merged playlists',
  };
}
const Merge = ({ items, onSubmit }) => {
  const { commonStore, playlistStore, myStore } = useStore();
  const [selected, setSelected] = useState([]);
  const [formValues, setFormValues] = useState(getInitialState());
  const [toggle, handleToggle] = useToggle({
    playlist: false,
  });

  const handleSelected = (item) => {
    if (selected.indexOf(item) > -1) {
      setSelected(selected.filter((s) => s !== item));
    } else {
      setSelected([...selected, item]);
    }
  };
  const handleChange = (e) => {
    formValues[e.target.name] = e.target.value;
  };
  const handleSubmit = () => {
    let tracks = [];
    let promises = [];
    selected.forEach((playlist) => {
      promises.push(playlistStore.getAllPlaylistTracks(playlist.id));
    });

    commonStore.setLoading(true);
    Promise.all(promises).then((res) => {
      res.forEach((item) => {
        tracks = [...tracks, ...item];
      });
      playlistStore
        .createPlaylistAddTracks(
          myStore.me.id,
          formValues['name'],
          tracks.map((item) => item.track)
        )
        .then((res) => {
          onSubmit();
          ReactGA.event({
            category: 'Playlists',
            action: 'MERGE',
            label: res.id,
          });
          commonStore.setLoading(true);
          handleToggle({ playlist: !toggle.playlist });
          setSelected([]);
          setFormValues(getInitialState());
        });
    });
  };

  const mappedPlaylists = items.map((item, key) => (
    <li key={key}>
      <CheckBox checked={selected.indexOf(item) > -1} onChange={() => handleSelected(item)}>
        {item.name} <small>({item.tracks.total})</small>
      </CheckBox>
    </li>
  ));
  return (
    <React.Fragment>
      <div className="container">
        <PlaylistStyle>{mappedPlaylists}</PlaylistStyle>
      </div>
      <BottomGradient>
        <div className="container">
          {selected.length > 1 && (
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
                <button className="btn btn-primary" onClick={handleSubmit}>
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

export default Merge;
