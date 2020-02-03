import { inject, observer } from 'mobx-react';
import Header from './Header';
import Loading from 'components/Loading';
import Main from 'components/Main';
import Menu from './Menu';
import React from 'react';
import styled from 'styled-components';

const SidebarLayout = ({ children, location, commonStore, myStore }) => {
  const [isMenu, setIsMenu] = React.useState(false);

  React.useEffect(() => {
    myStore.getUser();
  });
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
        <FullSideBarLayout className="content">{children}</FullSideBarLayout>
        {commonStore.isLoading && <Loading isLoading={true} />}
      </Main>
    </React.Fragment>
  );
};

export default inject('commonStore', 'myStore')(observer(SidebarLayout));

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
