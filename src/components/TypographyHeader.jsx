import { Typography } from '@mui/material';

const TypographyHeader = ({ children }) => {
  return (
    <Typography variant="h3" sx={{ paddingTop: '40px', paddingBottom: '20px' }}>
      {children}
    </Typography>
  );
};

export default TypographyHeader;
