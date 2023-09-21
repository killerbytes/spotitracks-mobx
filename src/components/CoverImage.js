import { observer } from 'mobx-react';
import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useStore } from 'stores';
import Vibrant from 'node-vibrant';

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

  const getColorsFromSwatches = (swatches) => {
    const colors = [];

    for (let swatch in swatches) {
      if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
        colors.push(swatches[swatch].getHex());
      }
    }

    return colors;
  };

  const getImage = useCallback(async () => {
    if (img) {
      Vibrant.from(img)
        .getSwatches()
        .then((s) => {
          commonStore.setColors(getColorsFromSwatches(s));
        });
    }
  }, [commonStore, img]);

  useEffect(() => {
    getImage();
  }, [getImage]);

  return (
    <CoverBG $img={img}>
      <img alt="cover" src={img} />
    </CoverBG>
  );
};

export default observer(CoverImage);
