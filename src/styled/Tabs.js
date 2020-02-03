import styled from 'styled-components';

export default styled.div`
  background-color: ${(props) => props.theme.darkBg};
  box-shadow: 5px 0 5px #000;
  margin-bottom: 1rem;
  position: sticky;
  top: 50px;
  width: 100%;
  nav {
    display: flex;
    justify-content: space-between;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  button {
    background: none;
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
      color: #fff;
      font-weight: 500;
      &:after {
        content: '';
        width: 2rem;
        margin-top: 5px;
        border-bottom: 2px solid ${(props) => props.theme.primary};
      }
    }
  }
`;
