import styled from 'styled-components';

export default styled.div`
  background-color: ${(props) => props.theme.background};
  box-shadow: 5px 0 5px ${(props) => props.theme.background};
  margin-bottom: ${(props) => props.theme.spacing.md};
  position: sticky;
  top: 50px;
  width: 100%;
  nav {
    display: flex;
    justify-content: space-evenly;
    padding-top: ${(props) => props.theme.spacing.md};
    padding-bottom: ${(props) => props.theme.spacing.md};
  }
  nav a {
    background: none;
    text-decoration: none;
    border: none;
    color: inherit;
    outline: none;
    margin: 0;
    cursor: pointer;
    display: flex;
    font-weight: 300;
    flex-direction: column;
    align-items: center;
    text-transform: uppercase;
    &.active {
      color: ${(props) => props.theme.foreground};
      font-weight: 500;
      &:after {
        content: '';
        width: ${(props) => props.theme.spacing.lg};
        margin-top: 5px;
        border-bottom: 2px solid ${(props) => props.theme.primary};
      }
    }
  }
`;
