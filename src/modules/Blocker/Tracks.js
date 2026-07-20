import React from 'react';

const Tracks = ({ items, onRemove }) => {
  const mappedTracks = items.map((i, key) => (
    <div
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
  return <div>{mappedTracks}</div>;
};

export default Tracks;
