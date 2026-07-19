import styled from 'styled-components';

export default styled.ul`
  margin: 0;
  padding: 0;
  padding-bottom: ${(props) => props.theme.spacing.lg};
  list-style-type: none;
  li {
    padding: ${(props) => props.theme.spacing.sm} 0;
    display: flex;
    a {
      color: inherit;
      text-decoration: none;
      small {
        opacity: 0.75;
        font-size: ${(props) => props.theme.fontSizes.xs};
      }
    }
    span:last-child {
      margin-left: auto;
    }
    small {
      margin-left: ${(props) => props.theme.spacing.xs};
    }
  }
`;
