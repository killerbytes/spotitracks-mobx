import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &.fullscreen {
    background: ${(props) => props.theme.overlayLight};
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    span {
      background: ${(props) => props.theme.overlay};
      border-radius: ${(props) => props.theme.borderRadius.md};
      .fa-spinner {
        color: ${(props) => props.theme.white};
      }
    }
  }
  span {
    padding: ${(props) => props.theme.spacing.sm};
  }
  .fa-spinner {
    color: ${(props) => props.theme.overlay};
    font-size: 2rem;
  }
`;
