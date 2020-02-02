import { inject } from 'mobx-react';
import React from 'react';

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
        {i.item.name} -{' '}
        {i.item.artists
          .map((artist) => artist.name)
          .toString()
          .replace(',', ', ')}
        <button onClick={() => handleRemove(i)}>Remove</button>
      </li>
    );
  });

  return (
    <div className="container">
      {item && (
        <React.Fragment>
          <strong>{item.name}</strong> <br />
          {item.artists
            .map((artist) => artist.name)
            .toString()
            .replace(',', ', ')}
          <button disabled={!item.id} onClick={handleBlock}>
            Block
          </button>
          <ul>{mappedBlocked}</ul>
        </React.Fragment>
      )}
    </div>
  );
};
export default inject('myStore', 'fireStore')(Blocker);
