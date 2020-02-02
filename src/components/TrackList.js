import React from 'react';
import styled from 'styled-components';

const TrackList = (tracks) => {
  const mappedTracks = tracks.map((item, key) => (
    <li key={key}>
      <div className="track">{item.name}</div>
      <div className="artists">
        {item.artists
          .map((artist) => artist.name)
          .toString()
          .replace(',', ', ')}
      </div>
    </li>
  ));

  return <TracksList>{mappedTracks}</TracksList>;
};
export default TrackList;

const TracksList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  li {
    padding: 0.5rem 0;
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
      font-size: 12px;
    }
  }
`;
