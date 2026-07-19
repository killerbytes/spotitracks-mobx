import React from 'react';
import styled from 'styled-components';

const TrackItem = ({ item, position, className, actions, children }) => {
  const { name, artists } = item;
  const imgUrl = item.album.images[0].url;

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
        <div className="item-content">
          <img src={imgUrl} alt={name} width={40} />
          <div className="track-info">
            <div className="track">{name}</div>
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
  padding: 0.5rem;
  display: flex;
  border-radius: ${(props) => props.theme.borderRadius.md};
  background: #20202080;
  .item-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
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
  .track-info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    font-size: ${(props) => props.theme.fontSizes.sm};
  }
  .track {
    color: ${(props) => props.theme.lightBg};
    font-size: ${(props) => props.theme.fontSizes.base};
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
