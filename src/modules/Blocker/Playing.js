import React from 'react';
import styled from 'styled-components';
import TrackStyled from 'styled/TracksStyled';

export default ({ playing, playing: { item = {} }, onBlock, isLoading }) => {
  return (
    <PageHeaderStyled className="page-header">
      <div className="container">
        {item.id ? (
          <TrackStyled className="header">
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
            <button disabled={!item.id || isLoading} onClick={() => onBlock(playing)}>
              Block
            </button>
          </TrackStyled>
        ) : (
          <h1>Spotify is not playing</h1>
        )}
      </div>
    </PageHeaderStyled>
  );
};

const PageHeaderStyled = styled.div`
  &.page-header {
    margin-bottom: 0;
    border-bottom: 1px solid;
  }
`;
