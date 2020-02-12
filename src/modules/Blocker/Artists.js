import React from 'react';
import TracksList from 'styled/TracksList';
import TrackStyled from 'styled/TracksStyled';

const Artists = ({ items, onRemove }) => {
  const mappedTracks = items.map((i, key) => {
    return (
      <li key={key}>
        <TrackStyled>
          <div>
            <div className="track">{i.name}</div>
          </div>
          <button onClick={() => onRemove(i, 'artists')}>
            {' '}
            <i className="fas fa-times"></i>
          </button>
        </TrackStyled>
      </li>
    );
  });
  return <TracksList>{mappedTracks}</TracksList>;
};

export default Artists;
