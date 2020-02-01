import styled from 'styled-components'

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
        color: ${props => props.theme.darkBg2};
      }
    }
    .track {
      color: ${props => props.theme.lightBg};
      margin-bottom: 0.3rem;
    }
    .artists {
      font-size: 12px;
    }
  }
`

export default TracksList
