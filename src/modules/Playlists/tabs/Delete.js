import BottomGradient from '../../../styled/BottomGradient';
import CheckBox from 'components/CheckBox';
import Modal from 'components/Modal';
import PlaylistStyle from 'styled/Playlist';
import React, { useState } from 'react';
import ReactGA from 'react-ga';
import { useStore } from 'stores';
import useToggle from 'hooks/useToggle';

const Merge = ({ items, onSubmit }) => {
  const { commonStore, playlistStore } = useStore();

  const [selected, setSelected] = useState([]);
  const [toggle, handleToggle] = useToggle({
    playlist: false,
  });

  const handleSelect = (item) => {
    if (selected.indexOf(item) > -1) {
      setSelected(selected.filter((s) => s !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  const handleSubmit = () => {
    selected.forEach(() => {});
    const promises = selected.map((item) => {
      return () => playlistStore.deletePlaylist(item.id);
    });
    commonStore.isLoading = true;
    Promise.all(promises.map((item) => item())).then(() => {
      ReactGA.event({
        category: 'Playlists',
        action: 'DELETE',
      });

      onSubmit();
      commonStore.isLoading = false;
      handleToggle({ playlist: !toggle.playlist });
      setSelected([]);
    });
  };

  const mappedPlaylists = items.map((item, key) => (
    <li key={key}>
      <CheckBox checked={selected.indexOf(item) > -1} onChange={() => handleSelect(item)}>
        {item.name} <small>({item.tracks.total})</small>
      </CheckBox>
    </li>
  ));
  return (
    <>
      <div className="container">
        <PlaylistStyle>{mappedPlaylists}</PlaylistStyle>
      </div>
      <BottomGradient>
        <div className="container">
          {selected.length > 0 && (
            <button className="btn btn-fab" onClick={() => handleToggle({ playlist: !toggle.playlist })}>
              <i className="fas fa-check" />
            </button>
          )}
        </div>
      </BottomGradient>
      {toggle.playlist && (
        <Modal title={`Warning`} onToggle={() => handleToggle({ playlist: !toggle.playlist })}>
          {() => (
            <>
              <p>Are you sure you want to delete the selected playlists?</p>
              <p>
                <small>
                  Accidentally deleted a playlist?
                  <a href="https://www.spotify.com/us/account/recover-playlists/">
                    https://www.spotify.com/us/account/recover-playlists/
                  </a>
                </small>
              </p>
              <div className="form-footer">
                <button className="btn btn-default" onClick={() => handleToggle({ playlist: !toggle.playlist })}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </>
          )}
        </Modal>
      )}
    </>
  );
};

export default Merge;
