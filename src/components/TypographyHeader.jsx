import { Typography } from '@mui/material';

const TypographyHeader = ({ children }) => {
  return (
    <Typography variant="h3" sx={{ paddingTop: '70px', paddingBottom: '20px' }}>
      {children}
    </Typography>
  );
};

export default TypographyHeader;
