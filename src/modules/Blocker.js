import { inject } from 'mobx-react';
import React from 'react';
import TracksList from 'styled/TracksList';
import styled from 'styled-components';

const Blocker = ({ myStore, fireStore }) => {
  const [playing, setPlaying] = React.useState({ item: { artists: [] } });
  const [blocked, setBlocked] = React.useState([]);

  const getCurrentPlaying = React.useCallback(() => {
    myStore.getCurrentPlaying().then((res) => {
      setPlaying(res);
      const found = playing && blocked.find((i) => i.item.id === playing.item.id);
      if (found) {
        myStore.nextTrack();
      }
    });
  }, [blocked, myStore, playing]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      getCurrentPlaying();
    }, 3000);
    return () => clearTimeout(timer);
  }, [blocked, myStore, playing, getCurrentPlaying]);

  React.useEffect(() => {
    if (myStore.me.id) {
      fireStore.findAll(myStore.me.id).then((res) => {
        setBlocked(res.blocklist);
      });
    }
  }, [myStore.me.id, fireStore]);

  const handleBlock = () => {
    const blocklist = [...blocked, playing];
    fireStore.create(myStore.me.id, { blocklist }).then(() => {
      setBlocked(blocklist);
      myStore.nextTrack().then(() => {
        getCurrentPlaying();
      });
    });
  };
  const handleRemove = ({ item }) => {
    const blocklist = blocked.filter((i) => i.item.id !== item.id);
    fireStore.create(myStore.me.id, { blocklist }).then(() => {
      setBlocked(blocklist);
    });
  };
  const { item } = playing;
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
          <button onClick={() => handleRemove(i)}>Unblock</button>
        </TrackStyled>
      </li>
    );
  });

  return (
    <>
      <HeaderStyled>
        <div className="container">
          <TrackStyled>
            {item.id && <>
              <div>
                <div className="track">{item.name}</div>
                <div className="artists">
                  {item.artists
                    .map((artist) => artist.name)
                    .toString()
                    .replace(',', ', ')}
                </div>
              </div>
              <button disabled={!item.id} onClick={handleBlock}>Block</button>
            </>}
          </TrackStyled>
        </div>

      </HeaderStyled>
      <div className="container">
        {item && (
          <React.Fragment>

            <TracksList>
              {mappedBlocked}
            </TracksList>
          </React.Fragment>
        )}
      </div>

    </>
  );
};
export default inject('myStore', 'fireStore')(Blocker);

const TrackStyled = styled.div`
display: flex;
.track {
  color: ${props => props.theme.lightBg};
  margin-bottom: 0.3rem;
}
.artists {
  font-size: .8em;
}
button{
  margin-left: auto;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer
}
`
const HeaderStyled = styled.header`
   background-color: ${(props) => props.theme.darkBg};
margin-bottom: 1rem;
font-size: 150%;
padding:1rem 0;
position: sticky;
top: 50px;
button{
  color: ${props => props.theme.primary};
}
`