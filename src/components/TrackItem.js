import React from 'react';
import styled from 'styled-components';

const TrackItem = ({ name, artists = [], position, className, actions, children }) => {
  return (
    <TrackItemStyled className={className}>
      {position && (
        <div>
          <span className="circle">{position}</span>
        </div>
      )}
      {children ? (
        children
      ) : (
        <div>
          <div className="track">{name}</div>
          <div className="artists">
            {artists
              .map((artist) => artist.name)
              .toString()
              .replace(',', ', ')}
          </div>
        </div>
      )}
      {actions && actions}
    </TrackItemStyled>
  );
};

const TrackItemStyled = styled.li`
  padding: 0.5rem 0;
  display: flex;
  &.header {
    font-size: 1.2em;
  }
  &.is-dupe {
    .track,
    .artists {
      text-decoration: line-through;
      color: ${(props) => props.theme.darkBg2};
    }
  }
  .track {
    color: ${(props) => props.theme.lightBg};
    margin-bottom: 0.3rem;
  }
  .artists {
    font-size: 0.8em;
  }
  button {
    outline: none;
    margin-left: auto;
    background: none;
    border: none;
    color: ${(props) => props.theme.lightBg};
    cursor: pointer;
  }
`;

export default TrackItem;
