import styled, { css } from 'styled-components';

export const Flex = styled.div`
  display: flex;

  /* Direction */
  flex-direction: ${({ $column }) => ($column ? 'column' : 'row')};

  /* Gap */
  ${({ $gap }) =>
    $gap &&
    css`
      gap: ${$gap};
    `}

  /* Optional: Align items to take full width in a column */
  width: 100%;
`;
