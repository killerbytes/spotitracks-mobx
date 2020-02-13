import React from 'react';
import TrackItem from 'components/TrackItem';
import TracksList from 'styled/TracksList';

const Tracks = ({ items, onRemove }) => {
  const mappedTracks = items.map((i, key) => (
    <TrackItem
      key={key}
      name={i.item.name}
      artists={i.item.artists}
      actions={
        <button onClick={() => onRemove(i)}>
          {' '}
          <i className="fas fa-times"></i>
        </button>
      }
    />
  ));
  return <TracksList>{mappedTracks}</TracksList>;
};

export default Tracks;
