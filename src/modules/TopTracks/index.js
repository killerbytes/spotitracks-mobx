import { LONG_TERM, MEDIUM_TERM, SHORT_TERM } from 'definitions';
import React from 'react';
import Tabs from 'styled/Tabs';
import TracksTab from './TracksTab';
import { Link, NavLink, useSearchParams } from 'react-router-dom';

const TopTracks = () => {
  const [tab, setTab] = React.useState();
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const tab = searchParams.get('tab');
    switch (tab) {
      case 'medium':
        setTab(1);
        break;
      case 'long':
        setTab(2);
        break;
      default:
        setTab(0);
    }
  }, [searchParams]);

  return (
    <>
      <Tabs>
        <div className="container">
          <nav>
            <Link to="/top-tracks" className={tab === 0 ? 'active' : ''}>
              SHORT
              <span className="line" />
            </Link>
            <Link to="/top-tracks?tab=medium" className={tab === 1 ? 'active' : ''}>
              MEDIUM
              <span className="line" />
            </Link>
            <Link to="/top-tracks?tab=long" className={tab === 2 ? 'active' : ''}>
              ALL TIME
              <span className="line" />
            </Link>
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
