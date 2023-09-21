import { ColorExtractor } from 'react-color-extractor';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import { useStore } from 'stores';

const CoverBG = styled.div`
  width: 60px;
  height: 60px;
  background-image: url(${(props) => props.$img});
  background-size: cover;
  margin-right: 0.5rem;
  img {
    visibility: hidden;
  }
`;

const CoverImage = ({ img }) => {
  const { commonStore } = useStore();

  const getColors = (colors) => {
    commonStore.colors = colors;
  };

  return (
    <CoverBG $img={img}>
      <ColorExtractor getColors={getColors}>
        <img alt="cover" src={img} />
      </ColorExtractor>
    </CoverBG>
  );
};

export default observer(CoverImage);
