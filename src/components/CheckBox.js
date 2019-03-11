import React from 'react'
import styled from 'styled-components'

const CheckBoxStyle = styled.label`
  display: flex;
  align-items: center;
  input[type='checkbox'] {
    display: none;
  }
  span {
    display: inline-block;
    width: 13px;
    min-width: 13px;
    height: 13px;
    background: ${props => props.theme.darkBg2};
    border-radius: 100%;
    margin-right: 0.5em;
    border: 1px solid ${props => props.theme.lightBg2};
  }
  input[type='checkbox']:checked ~ span {
    background: ${props => props.theme.primary};
  }
`
export default class CheckBox extends React.Component {
  render() {
    const { children, ...rest } = this.props
    return (
      <CheckBoxStyle>
        <input type="checkbox" {...rest} />
        <span />
        {children}
      </CheckBoxStyle>
    )
  }
}
