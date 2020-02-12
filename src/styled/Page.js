import styled from 'styled-components';

export default styled.div`
  .page-header {
    background-color: ${(props) => props.theme.darkBg};
    width: 100%;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    position: sticky;
    top: 50px;
    margin-bottom: 1rem;
    z-index: 10;
    & > div {
      display: flex;
      align-items: center;
    }
  }
  h1 {
    font-size: 18px;
    flex: 1;
    display: flex;
    align-items: center;
    img {
      margin-right: 0.5rem;
    }
  }
  .controls {
    margin-left: auto;
    text-align: right;
    padding-left: 1rem;
    .btn-toggle {
      display: block;
      text-align: center;
    }
    .btn-toggle + .btn-toggle {
      margin-top: 0.5rem;
    }
    @media (min-width: 576px) {
      .btn-toggle {
        display: inline-block;
      }
    }
  }
`;
