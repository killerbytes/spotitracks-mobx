import { inject } from 'mobx-react';
import { userRef } from 'services/firestore';
import Artists from './Artists';
import Loading from 'components/Loading';
import Page from 'styled/Page';
import Playing from './Playing';
import React from 'react';
import styled from 'styled-components';
import Tabs from 'styled/Tabs';
import Tracks from './Tracks';

const getDefaultBlockedState = () => ({ tracks: [], artists: [] });
const Blocker = ({ myStore }) => {
  const [playing, setPlaying] = React.useState({ item: { artists: [] } });
  const [blocked, setBlocked] = React.useState(getDefaultBlockedState());
  const [isLoading, setIsLoading] = React.useState(false);
  const [tab, setTab] = React.useState(0);

  React.useEffect(() => {
    if (!isLoading && playing) {
      const foundTracks = blocked.tracks.find((i) => i.item.id === playing.item.id);
      const foundArtist = blocked.artists.find((i) => {
        const found = playing.item.artists.find((artist) => artist.id === i.id);
        return found;
      });
      if (foundTracks || foundArtist) {
        myStore.nextTrack();
      }
    }
  }, [blocked.artist, blocked.artists, blocked.tracks, isLoading, myStore, playing]);

  const getCurrentPlaying = React.useCallback(() => {
    myStore.getCurrentPlaying().then((res) => {
      setPlaying(res);
      setIsLoading(false);
    });
  }, [myStore]);

  React.useEffect(() => {
    if (myStore.me.id) {
      userRef.child(myStore.me.id).on('value', (snapshot) => {
        setBlocked((prevState) => {
          return { ...prevState, ...{ ...getDefaultBlockedState(), ...snapshot.val() } };
        });
      });
    }
  }, [myStore.me.id]);

  React.useEffect(() => {
    let timer = setInterval(() => {
      getCurrentPlaying();
    }, 3000);
    return () => clearInterval(timer);
  }, [getCurrentPlaying]);

  const saveChanges = async (payload) => {
    userRef.child(myStore.me.id).set(payload);
  };

  const handleBlock = (selected, type = 'tracks') => {
    const { item, id } = selected;
    const current = id || item.id;

    const found = blocked[type].find(({ id, item }) => (id || item.id) === current);
    if (found) return false;
    const blocklist = { ...blocked, [type]: [...blocked[type], selected] };
    setIsLoading(true);
    myStore.nextTrack();
    saveChanges(blocklist);
  };

  const handleRemove = ({ id, item }, type = 'tracks') => {
    const filtered = blocked[type].filter((i) => (type === 'tracks' ? i.item.id !== item.id : i.id !== id));
    const blocklist = { ...blocked, [type]: filtered };
    saveChanges(blocklist);
  };
  return (
    <Page>
      <Playing playing={playing} isLoading={isLoading} onBlock={handleBlock} />
      <Tabs>
        <nav className="container">
          <button onClick={() => setTab(0)} className={tab === 0 ? 'active' : ''}>
            Tracks
            <span className="line" />
          </button>
          <button onClick={() => setTab(1)} className={tab === 1 ? 'active' : ''}>
            Artist
            <span className="line" />
          </button>
        </nav>
      </Tabs>
      <div className="container">
        {tab === 0 && <Tracks items={blocked.tracks} onRemove={handleRemove} />}
        {tab === 1 && <Artists items={blocked.artists} onRemove={handleRemove} />}

        <NoteStyled>
          Note: This page only works on desktop and needs to be running on background in order for it to work
        </NoteStyled>
      </div>
      {isLoading && <Loading />}
    </Page>
  );
};
export default inject('myStore')(Blocker);

const NoteStyled = styled.p`
  margin-top: 5rem;
  color: ${(props) => props.theme.colorRed};
`;
