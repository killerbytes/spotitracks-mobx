import styled from 'styled-components'

export default styled.nav`
  display: flex;
  margin-bottom: 1rem;
  justify-content: space-between;
  a {
    padding: 0.5rem 0;
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
