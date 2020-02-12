import styled from 'styled-components';

const TrackStyled = styled.div`
  display: flex;
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
    color: inherit;
    cursor: pointer;
  }
  &.header {
    width: 100%;
    button {
      color: ${(props) => props.theme.primary};
    }
  }
`;

export default TrackStyled;
