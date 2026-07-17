import { observer } from 'mobx-react';
import Delete from './tabs/Delete';
import Merge from './tabs/Merge';
import React, { useEffect, useState } from 'react';
import Tabs from 'styled/Tabs';
import { Link, useSearchParams } from 'react-router-dom';
import { useStore } from 'stores';
import MyPlaylists from './tabs/Playlists';

const Playlists = () => {
  const [tab, setTab] = useState(0);
  const { playlistStore } = useStore();

  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const tab = searchParams.get('tab');
    switch (tab) {
      case 'merge':
        setTab(1);
        break;
      case 'delete':
        setTab(2);
        break;
      default:
        setTab(0);
    }
  }, [searchParams]);

  useEffect(() => {
    playlistStore.getPlaylists();
  }, [playlistStore]);

  const handleSubmit = () => {
    playlistStore.getPlaylists();
  };

  return (
    <>
      <Tabs>
        <nav className="container">
          <Link to="/playlists" className={tab === 0 ? 'active' : ''}>
            PLAYLISTS
            <span className="line" />
          </Link>
          <Link to="/playlists?tab=merge" className={tab === 1 ? 'active' : ''}>
            MERGE
            <span className="line" />
          </Link>
          <Link to="/playlists?tab=delete" className={tab === 2 ? 'active' : ''}>
            DELETE
            <span className="line" />
          </Link>
        </nav>
      </Tabs>
      {tab === 0 && <MyPlaylists items={playlistStore.playlists.items} />}
      {tab === 1 && <Merge items={playlistStore.playlists.items} onSubmit={handleSubmit} />}
      {tab === 2 && <Delete items={playlistStore.playlists.items} onSubmit={handleSubmit} />}
    </>
  );
};

export default observer(Playlists);
