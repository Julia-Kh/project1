import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Box from '@mui/material/Box';
const MainLayout = ({ setCurrentTheme }) => (
  <>
    <Header setCurrentTheme={setCurrentTheme} />
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
      }}
    >
      <Outlet />
    </Box>
  </>
);

export default MainLayout;
