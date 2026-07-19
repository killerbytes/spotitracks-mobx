import React from 'react';
import styled from 'styled-components';

export default class CheckBox extends React.Component {
  render() {
    const { children, ...rest } = this.props;
    return (
      <CheckBoxStyle>
        <input type="checkbox" {...rest} />
        <span />
        {children}
      </CheckBoxStyle>
    );
  }
}

const CheckBoxStyle = styled.label`
  cursor: pointer;
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
    background: ${(props) => props.theme.darkBg2};
    border-radius: ${(props) => props.theme.borderRadius.circle};
    margin-right: 0.5em;
    border: 1px solid ${(props) => props.theme.lightBg2};
  }
  input[type='checkbox']:checked ~ span {
    background: ${(props) => props.theme.primary};
  }
`;
