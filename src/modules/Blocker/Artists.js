import React from 'react';
import TrackItem from 'components/TrackItem';
import TracksList from 'styled/TracksList';

const Artists = ({ items, onRemove }) => {
  const mappedTracks = items.map((item, key) => {
    const { name, artists } = item;
    return (
      <TrackItem
        key={key}
        name={name}
        artists={artists}
        actions={
          <button onClick={() => onRemove(item, 'artists')}>
            {' '}
            <i className="fas fa-times"></i>
          </button>
        }
      />
    );
  });
  return <TracksList>{mappedTracks}</TracksList>;
};

export default Artists;
