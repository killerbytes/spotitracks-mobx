import React from 'react';

const Artists = ({ items, onRemove }) => {
  const mappedTracks = items.map((item, key) => {
    const { name, artists } = item;
    return (
      <div
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
  return <div>{mappedTracks}</div>;
};

export default Artists;
