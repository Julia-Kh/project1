import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const MainLayout = ({ setCurrentTheme }) => (
  <>
    <Header  setCurrentTheme={setCurrentTheme} />
    <Outlet />
  </>
);

export default MainLayout;
