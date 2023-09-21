import styled from 'styled-components'

export default styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &.fullscreen {
    background: rgba(255, 255, 255, 0.3);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    span {
      background: rgba(0, 0, 0, 0.5);
      border-radius: 0.5rem;
      .fa-spinner {
        color: #fff;
      }
    }
  }
  span {
    padding: 0.5rem;
  }
  .fa-spinner {
    color: rgba(0, 0, 0, 0.5);
    font-size: 2rem;
  }
`
