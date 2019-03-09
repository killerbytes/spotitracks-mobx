import styled from 'styled-components'

export default styled.div`
  background-color: ${props => props.theme.darkBg};

  margin-bottom: 1rem;
  position: sticky;
  top: 50px;
  width: 100%;
  padding: 1rem;
  nav {
    display: flex;
    justify-content: space-between;
  }
  a {
    margin: 0 1rem;
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
        border-bottom: 2px solid ${props => props.theme.primary};
      }
    }
  }
`
