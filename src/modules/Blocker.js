import { inject } from 'mobx-react';
import Loading from 'components/Loading';
import Page from 'styled/Page';
import React from 'react';
import styled from 'styled-components';
import TracksList from 'styled/TracksList';

const Blocker = ({ myStore, fireStore }) => {
  const [playing, setPlaying] = React.useState({ item: { artists: [] } });
  const [blocked, setBlocked] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getCurrentPlaying = React.useCallback(() => {
    if (isLoading) return false;
    myStore.getCurrentPlaying().then((res) => {
      setPlaying(res);
      const found = playing && blocked.find((i) => i.item.id === playing.item.id);
      if (found) {
        myStore.nextTrack();
      }
    });
  }, [blocked, myStore, playing, isLoading]);

  React.useEffect(() => {
    let timer = setInterval(() => {
      getCurrentPlaying();
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const getBlockedList = React.useCallback(() => {
    if (myStore.me.id) {
      fireStore.findAll(myStore.me.id).then((res) => {
        setBlocked(res.blocklist);
        setIsLoading(false);
      });
    }
  }, [myStore.me.id, fireStore]);

  React.useEffect(() => {
    setIsLoading(true);
    getBlockedList();
  }, [getBlockedList]);

  const handleBlock = () => {
    const blocklist = [...blocked, playing];
    setIsLoading(true);
    fireStore.create(myStore.me.id, { blocklist }).then(() => {
      myStore.nextTrack().then(() => {
        getCurrentPlaying();
        setIsLoading(false);
        getBlockedList();
      });
    });
  };
  const handleRemove = ({ item }) => {
    const blocklist = blocked.filter((i) => i.item.id !== item.id);
    fireStore.create(myStore.me.id, { blocklist }).then(() => {
      setBlocked(blocklist);
    });
  };
  const { item = {} } = playing;
  const mappedBlocked = blocked.map((i, key) => {
    return (
      <li key={key}>
        <TrackStyled>
          <div>
            <div className="track">{i.item.name}</div>
            <div className="artists">
              {i.item.artists
                .map((artist) => artist.name)
                .toString()
                .replace(',', ', ')}
            </div>
          </div>
          <button onClick={() => handleRemove(i)}>
            {' '}
            <i className="fas fa-times"></i>
          </button>
        </TrackStyled>
      </li>
    );
  });

  return (
    <Page>
      <div className="page-header">
        <div className="container">
          {item.id ? (
            <TrackStyled className="header">
              {!isLoading && (
                <>
                  <div>
                    <div className="track">{item.name}</div>
                    <div className="artists">
                      {item.artists
                        .map((artist) => artist.name)
                        .toString()
                        .replace(',', ', ')}
                    </div>
                  </div>
                  <button disabled={!item.id} onClick={handleBlock}>
                    Block
                  </button>
                </>
              )}
            </TrackStyled>
          ) : (
            <h1>Spotify is not playing</h1>
          )}
        </div>
      </div>
      <div className="container">
        <React.Fragment>
          {mappedBlocked.length ? (
            <TracksList>{mappedBlocked}</TracksList>
          ) : (
            <p>Note: this page only works on desktop and needs to be run on background in order for it to work</p>
          )}
        </React.Fragment>
      </div>
      {isLoading && <Loading />}
    </Page>
  );
};
export default inject('myStore', 'fireStore')(Blocker);

const TrackStyled = styled.div`
  display: flex;
  .track {
    color: ${(props) => props.theme.lightBg};
    margin-bottom: 0.3rem;
  }
  .artists {
    font-size: 0.8em;
  }
  button {
    outline: none;
    margin-left: auto;
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
  }
  &.header {
    width: 100%;
    button {
      color: ${(props) => props.theme.primary};
    }
  }
`;
