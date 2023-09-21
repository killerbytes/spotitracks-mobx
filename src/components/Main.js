import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useStore } from 'stores';
import styled from 'styled-components';

const Layout = styled.main`
  transition: all 0.3s ease 0s;
  transform: ${(props) => (props.$isMenu ? `translateX(80%)` : `unset`)};
  position: ${(props) => (props.$isMenu ? `fixed` : `relative`)};
  width: 100%;
  header + .content {
    min-height: calc(100vh - 50px);
  }
  &:before {
    content: '';
    opacity: 0.5;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1;
    /* animation: AnimationName 22s ease infinite; */
    /* background: linear-gradient(129deg, #000, #545353, #2d2d2d, #484848, #545353); */
    background: ${(props) =>
      `linear-gradient(129deg,${props.$isColor ? props.$colors : `#000, #545353, #2d2d2d, #484848, #545353`})`};

    background-size: 1000% 1000%;
  }

  @keyframes AnimationName {
    0% {
      background-position: 0% 78%;
    }
    50% {
      background-position: 100% 23%;
    }
    100% {
      background-position: 0% 78%;
    }
  }
`;
const Main = ({ isMenu, children }) => {
  const { commonStore } = useStore();
  const [isColor, setIsColor] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const re = new RegExp('playlists/');
    if (re.test(location.pathname)) {
      setIsColor(true);
    } else {
      setIsColor(false);
    }
  }, [location.pathname]);

  return (
    <Layout $isMenu={isMenu} $isColor={isColor} $colors={commonStore.imageColors}>
      {children}
    </Layout>
  );
};

export default observer(Main);
