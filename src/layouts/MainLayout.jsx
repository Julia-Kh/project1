import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Box from '@mui/material/Box';
const MainLayout = ({ setCurrentTheme }) => (
  <>
    <Header setCurrentTheme={setCurrentTheme} />
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        // width: '100%',
        // height: '100%',
        alignItems: 'center',
        // justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
        marginTop: '90px'
      }}
    >
      <Outlet />
    </Box>
  </>
);

export default MainLayout;
