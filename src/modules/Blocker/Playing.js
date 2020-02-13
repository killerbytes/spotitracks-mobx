import React from 'react';
import styled from 'styled-components';
import TrackItem from 'components/TrackItem';

export default ({ playing, playing: { item = {} }, onBlock, isLoading }) => {
  return (
    <PageHeaderStyled className="page-header">
      <ul className="container">
        {item.id ? (
          <TrackItem
            className="header"
            name={item.name}
            artists={item.artists}
            actions={
              <button disabled={!item.id || isLoading} onClick={() => onBlock(playing)}>
                Block
              </button>
            }
          >
            <div>
              <div className="track">{item.name}</div>
              <div className="artists">
                {item.artists.map((artist, key) => (
                  <span key={`artist-${key}`}>
                    {artist.name}
                    <button disabled={isLoading} onClick={() => onBlock(artist, 'artists')}>
                      <i className="fas fa-ban"></i>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </TrackItem>
        ) : (
          <h1>Spotify is not playing</h1>
        )}
      </ul>
    </PageHeaderStyled>
  );
};

const PageHeaderStyled = styled.div`
  &.page-header {
    margin-bottom: 0;
    border-bottom: 1px solid;
  }
`;
