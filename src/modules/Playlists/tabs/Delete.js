import BottomGradient from 'styled/BottomGradient';

import Button from 'styled/Button';
import CheckBox from 'components/CheckBox';
import Modal from 'components/Modal';
import React, { useState } from 'react';
import ReactGA from 'react-ga';
import { useStore } from 'stores';
import useToggle from 'hooks/useToggle';
import { observer } from 'mobx-react';
import { List, ListItem, ListItemContent, ListItemDescription, ListItemText } from 'components/List';

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

  return (
    <>
      <div className="container">
        <h1>Delete Playlists</h1>

        <List>
          {items.map((item, key) => (
            <ListItem key={key}>
              <CheckBox checked={selected.indexOf(item) > -1} onChange={() => handleSelect(item)}>
                <ListItemContent>
                  <ListItemText>{item.name}</ListItemText>
                  <ListItemDescription>{item.tracks.total} tracks</ListItemDescription>
                </ListItemContent>
              </CheckBox>
            </ListItem>
          ))}
        </List>
      </div>
      <BottomGradient>
        <div className="container">
          {selected.length > 0 && (
            <Button className="btn-primary btn-fab" onClick={() => handleToggle({ playlist: !toggle.playlist })}>
              <i className="fas fa-check" />
            </Button>
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
                <Button className="btn-default" onClick={() => handleToggle({ playlist: !toggle.playlist })}>
                  Cancel
                </Button>
                <Button className="btn-primary" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </>
          )}
        </Modal>
      )}
    </>
  );
};

export default observer(Merge);
