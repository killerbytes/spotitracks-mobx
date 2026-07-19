import styled from 'styled-components'

export default styled.div`
  background: ${(props) => props.theme.white};
  background: linear-gradient(180deg, #fff0 15%, #2828287f 40%, ${(props) => props.theme.darkBg} 90%);

  position: fixed;
  bottom: 0;
  height: 50px;
  width: 100%;
  text-align: right;
  .container {
    position: relative;
  }
`
