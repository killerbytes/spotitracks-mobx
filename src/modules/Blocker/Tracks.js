import React from 'react';
import TracksList from 'styled/TracksList';
import TrackStyled from 'styled/TracksStyled';

const Tracks = ({ items, onRemove }) => {
  const mappedTracks = items.map((i, key) => {
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
          <button onClick={() => onRemove(i)}>
            {' '}
            <i className="fas fa-times"></i>
          </button>
        </TrackStyled>
      </li>
    );
  });
  return <TracksList>{mappedTracks}</TracksList>;
};

export default Tracks;
