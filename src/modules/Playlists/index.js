import { observer } from 'mobx-react';
import Delete from './tabs/Delete';
import Merge from './tabs/Merge';
import React, { useEffect, useState } from 'react';
import Tabs from 'styled/Tabs';
import { useStore } from 'stores';
import MyPlaylists from './tabs/Playlists';

const Playlists = () => {
  const [tab, setTab] = useState(0);
  const { myStore } = useStore();

  useEffect(() => {
    myStore.getPlaylists();
  }, [myStore]);

  const handleTabClick = (tab) => {
    setTab(tab);
  };

  const handleSubmit = () => {
    myStore.getPlaylists();
  };

  return (
    <>
      <Tabs>
        <nav className="container">
          <button onClick={() => handleTabClick(0)} className={tab === 0 ? 'active' : ''}>
            PLAYLISTS
            <span className="line" />
          </button>
          <button onClick={() => handleTabClick(1)} className={tab === 1 ? 'active' : ''}>
            MERGE
            <span className="line" />
          </button>
          <button onClick={() => handleTabClick(2)} className={tab === 2 ? 'active' : ''}>
            DELETE
            <span className="line" />
          </button>
        </nav>
      </Tabs>
      {tab === 0 && <MyPlaylists items={myStore.playlists.items} />}
      {tab === 1 && <Merge items={myStore.playlists.items} onSubmit={handleSubmit} />}
      {tab === 2 && <Delete items={myStore.playlists.items} onSubmit={handleSubmit} />}
    </>
  );
};

export default observer(Playlists);
