import { ColorExtractor } from 'react-color-extractor';
import { inject, observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

const CoverBG = styled.div`
  width: 60px;
  height: 60px;
  background-image: url(${(props) => props.img});
  background-size: cover;
  margin-right: 0.5rem;
  img {
    visibility: hidden;
  }
`;

class CoverImage extends React.Component {
  getColors = (colors) => {
    const { commonStore } = this.props;
    commonStore.colors = colors;
  };
  render() {
    const { img } = this.props;
    return (
      <CoverBG img={img}>
        <ColorExtractor getColors={this.getColors}>
          <img alt="cover" src={img} />
        </ColorExtractor>
      </CoverBG>
    );
  }
}

export default inject('commonStore')(observer(CoverImage));
