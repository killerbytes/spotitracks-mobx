import { observer } from 'mobx-react';
import Header from './Header';
import Loading from 'components/Loading';
import Main from 'components/Main';
import Menu from './Menu';
import React from 'react';
import styled from 'styled-components';
import { Outlet, useLocation } from 'react-router-dom';
import { useStore } from 'stores';

const SidebarLayout = ({ children }) => {
  const [isMenu, setIsMenu] = React.useState(false);
  const location = useLocation();
  const { commonStore, myStore } = useStore();

  React.useEffect(() => {
    myStore.getUser();
  }, [myStore]);

  React.useEffect(() => {
    setIsMenu(false);
  }, [location]);

  const handleToggleMenu = () => {
    setIsMenu(!isMenu);
  };
  const handleCloseMenu = () => {
    if (isMenu) {
      setIsMenu(false);
    }
  };

  return (
    <React.Fragment>
      <Menu isMenu={isMenu} />
      <Main isMenu={isMenu}>
        {isMenu && <MainOverlay onClick={handleCloseMenu} />}
        <Header onToggle={handleToggleMenu} />
        <FullSideBarLayout className="content">
          <Outlet />
        </FullSideBarLayout>
        {commonStore.isLoading && <Loading />}
      </Main>
    </React.Fragment>
  );
};

export default observer(SidebarLayout);

const FullSideBarLayout = styled.div`
  background: ${(props) => props.theme.bgDarkGray};
  .no-wrap {
    flex-wrap: nowrap;
  }
`;

const MainOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
`;
