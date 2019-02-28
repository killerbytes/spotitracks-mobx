import styled from 'styled-components'

export default styled.ul`
  margin: 0;
  padding: 0;
  margin-bottom: 3rem;
  list-style-type: none;
  li {
    padding: 0.5rem 0;
    display: flex;
    a {
      color: inherit;
      text-decoration: none;
      small {
        font-size: 11px;
      }
    }
    span:last-child {
      margin-left: auto;
    }
    small {
      margin-left: 0.3rem;
    }
  }
`
