import styled from 'styled-components'

const TracksList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  li {
    display: flex;
    border-bottom: 1px solid #2d2d2d;
    color: #fff;
    > div {
      width: 50%;
      padding: 0.5rem;
      -ms-flex-preferred-size: 50%;
      flex-basis: 50%;
      overflow: hidden;
      white-space: nowrap;
      &:first-child {
        padding-left: 0;
      }
    }
    &.is-dupe {
      text-decoration: line-through;
      color: #333;
    }
  }
`

export default TracksList
