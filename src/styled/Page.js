import styled from 'styled-components'

export default styled.div`
  .page-header {
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.darkBg};
    width: 100%;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    position: sticky;
    top: 56px;
  }
  h1 {
    font-size: 18px;
  }
  .controls {
    text-align: right;
  }
`
