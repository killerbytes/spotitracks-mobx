const { Outlet } = require('react-router-dom');
const { default: SidebarLayout } = require('./SidebarLayout');

const MainLayout = () => {
  return (
    <div>
      <SidebarLayout />
      <Outlet />
    </div>
  );
};

export default MainLayout;
