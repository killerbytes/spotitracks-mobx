import styled from 'styled-components';

export default styled.div`
  .page-header {
    background-color: ${(props) => props.theme.background};
    width: 100%;
    padding-top: ${(props) => props.theme.spacing.sm};
    padding-bottom: ${(props) => props.theme.spacing.sm};
    position: sticky;
    top: 50px;
    margin-bottom: ${(props) => props.theme.spacing.md};
    z-index: 10;
    & > div {
      display: flex;
      align-items: center;
    }
  }
  h1 {
    font-size: ${(props) => props.theme.fontSizes.lg};
    flex: 1;
    display: flex;
    align-items: center;
    img {
      margin-right: ${(props) => props.theme.spacing.sm};
    }
  }
  .controls {
    margin-left: auto;
    text-align: right;
    padding-left: ${(props) => props.theme.spacing.md};
    .btn-toggle {
      display: block;
      text-align: center;
    }
    .btn-toggle + .btn-toggle {
      margin-top: ${(props) => props.theme.spacing.sm};
    }
    @media (min-width: 576px) {
      .btn-toggle {
        display: inline-block;
      }
    }
  }
`;
