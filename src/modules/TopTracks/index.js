import { LONG_TERM, MEDIUM_TERM, SHORT_TERM } from 'definitions';
import React from 'react';
import Tabs from 'styled/Tabs';
import TracksTab from './TracksTab';
import { useStore } from 'stores';

const TopTracks = () => {
  const [tab, setTab] = React.useState(0);
  const { myStore } = useStore();

  React.useEffect(() => {
    // myStore.getTopTracks();
  }, [myStore]);

  const handleTabClick = (tab) => {
    setTab(tab);
  };
  return (
    <>
      <Tabs>
        <div className="container">
          <nav>
            <button onClick={() => handleTabClick(0)} className={tab === 0 ? 'active' : ''}>
              SHORT
              <span className="line" />
            </button>
            <button onClick={() => handleTabClick(1)} className={tab === 1 ? 'active' : ''}>
              MEDIUM
              <span className="line" />
            </button>
            <button onClick={() => handleTabClick(2)} className={tab === 2 ? 'active' : ''}>
              ALL TIME
              <span className="line" />
            </button>
          </nav>
        </div>
      </Tabs>
      {tab === 0 && <TracksTab range={SHORT_TERM} />}
      {tab === 1 && <TracksTab range={MEDIUM_TERM} />}
      {tab === 2 && <TracksTab range={LONG_TERM} />}
    </>
  );
};

export default TopTracks;
