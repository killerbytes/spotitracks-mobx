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

  &.header {
    width: 100%;
    button {
      color: ${(props) => props.theme.primary};
    }
  }
`;

export default TrackStyled;
