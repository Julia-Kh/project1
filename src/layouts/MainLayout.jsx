import { Outlet } from 'react-router-dom';
import Menu from '../components/Menu';

const MainLayout = () => (
  <>
    <Menu />
    <Outlet />
  </>
);

export default MainLayout;
