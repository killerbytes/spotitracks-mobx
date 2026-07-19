import styled from 'styled-components';

const Button = styled.button`
  outline: none;
  background-color: ${(props) => props.theme.darkBg2};
  width: auto;
  display: inline-block;
  border: none;
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => props.theme.lightBg};
  text-transform: uppercase;
  text-decoration: none;
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.pill};
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
  }
  &:hover {
    background-color: ${(props) => props.theme.darkBg};
  }

  &.btn-clear {
    padding: 0;
    background: none;
    box-shadow: none;
  }
  &.btn-default {
    background-color: ${(props) => props.theme.darkBg};
  }
  &.btn-primary {
    background-color: ${(props) => props.theme.primary};
    &:hover {
      box-shadow: none;
      background-color: ${(props) => props.theme.primaryHover};
    }
  }
  &.btn-fab {
    background-color: ${(props) => props.theme.primary};
    position: absolute;
    top: -${(props) => props.theme.spacing.lg};
    right: ${(props) => props.theme.spacing.md};
    width: 45px;
    height: 45px;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    box-shadow: 0 0 5px 0 ${(props) => props.theme.black};
  }
  &.btn-outline {
    border: 1px solid ${(props) => props.theme.lightBg2};
  }
`;

export default Button;
