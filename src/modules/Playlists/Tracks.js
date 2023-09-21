import { observer } from 'mobx-react';
import BottomGradient from '../../styled/BottomGradient';
import CoverImage from 'components/CoverImage';
import Modal from 'components/Modal';
import Page from 'styled/Page';
import React, { useCallback, useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import TrackItem from 'components/TrackItem';
import TracksList from 'styled/TracksList';
import { useStore } from 'stores';
import { toJS } from 'utils';

function getInitialValues() {
  return {
    shuffle: false,
    dedupe: false,
    name: '',
  };
}

const Tracks = ({ items: _items, onSubmit }) => {
  const { playlistStore, myStore } = useStore();

  const [hasDuplicates, setHasDuplicates] = useState(false);
  const [formValues, setFormValues] = useState(getInitialValues());
  const [coverImg, setCoverImg] = useState(null);
  const [dupes, setDupes] = useState([]);
  const [items, setItems] = useState(_items);

  const [modal, setModal] = useState({
    playlist: false,
  });

  const toggleModal = (name) => {
    setModal((prevState) => ({ ...prevState, [name]: !modal[name] }));
  };

  useEffect(() => {
    setCoverImg(playlistStore.playlist.images.reduce((i, v) => (i = v), {}).url || '');
  }, [playlistStore.playlist.images]);

  useEffect(() => {
    setItems(_items);
  }, [_items]);

  const getDuplicates = useCallback(() => {
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
  }, [playlistStore.tracks.items]);

  useEffect(() => {
    setHasDuplicates(getDuplicates().length ? true : false);
  }, [getDuplicates]);

  const handleDuplicates = (e) => {
    setFormValues((prevState) => ({ ...prevState, dedupe: e.target.checked }));
    if (e.target.checked) {
      setDupes(getDuplicates());
    } else {
      getDuplicates([]);
    }
  };

  const handleChange = (e) => {
    formValues[e.target.name] = e.target.value;
  };

  const handleShuffle = (e) => {
    setFormValues((prevState) => ({ ...prevState, shuffle: e.target.checked }));
    if (e.target.checked) {
      setItems(
        playlistStore.tracks.items
          .slice()
          .sort(function () {
            return 0.3 - Math.random();
          })
          .slice()
          .sort(function () {
            return 0.5 - Math.random();
          })
      );
    } else {
      setItems([...playlistStore.tracks.items]);
    }
  };

  const handleSave = () => {
    formValues['name'] = `${playlistStore.playlist.name} ${formValues['shuffle'] ? 'shuffled' : ''} ${
      formValues['dedupe'] ? 'deduped' : ''
    }`;

    toggleModal('playlist');
  };

  const handleSubmit = () => {
    const tracks = items.filter((item) => dupes.indexOf(item) === -1);
    console.log(toJS(tracks));

    playlistStore
      .createPlaylistAddTracks(
        myStore.me.id,
        formValues['name'],
        tracks.map((item) => item.track)
      )
      .then((res) => {
        toggleModal('playlist');
        setDupes([]);
        ReactGA.event({
          category: 'Playlist',
          action: `${formValues['dedupe'] ? 'deduped|' : ''}${formValues['shuffle'] ? 'shuffled' : ''}`,
          label: res.id,
        });

        setFormValues(getInitialValues());

        onSubmit();
      });
  };

  return (
    <Page>
      <div className="page-header">
        <div className="container">
          <h1>
            <CoverImage img={coverImg} /> {playlistStore.playlist.name}
          </h1>
          <div className="controls">
            <label className="btn-toggle" htmlFor="shuffle">
              <input id="shuffle" type="checkbox" onChange={handleShuffle} />
              <div className="btn-bg btn btn-toggle">Shuffle</div>
            </label>
            {hasDuplicates && (
              <label className="btn-toggle" htmlFor="dedupe">
                <input id="dedupe" type="checkbox" onChange={handleDuplicates} />
                <div className="btn-bg btn btn-toggle">Deduplicate</div>
              </label>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <TracksList>
          {items.map((item, key) => {
            const { name, artists } = item.track;
            return (
              <TrackItem
                key={key}
                name={name}
                artists={artists}
                className={dupes.indexOf(item) !== -1 ? 'is-dupe' : ''}
              />
            );
          })}
        </TracksList>
      </div>
      <BottomGradient>
        <div className="container">
          {(formValues['shuffle'] || formValues['dedupe']) && (
            <button className="btn btn-fab" onClick={handleSave}>
              <i className="fas fa-check" />
            </button>
          )}
        </div>
      </BottomGradient>
      {modal['playlist'] && (
        <Modal title={`Create Playlist`} onToggle={() => toggleModal('playlist')}>
          {() => (
            <React.Fragment>
              <form>
                <div className="form-group">
                  <label>Name</label>
                  <input className="form-control" name="name" value={formValues['name']} onChange={handleChange} />
                </div>
              </form>
              <div className="form-footer">
                <button className="btn btn-default" onClick={() => toggleModal('playlist')}>
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
    </Page>
  );
};

export default observer(Tracks);
