import { useNavigate } from 'react-router-dom';
import TypographyHeader from './TypographyHeader';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { Button } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const SvgImage = styled(CardMedia)(({ theme }) => ({
  filter: theme.palette.mode === 'dark' ? 'invert(100%)' : 'none',
}));

const text = `Here you can create your own collections, add elements and share them with your friends!
The site is still under development, its creator, Julia, has many ideas for improving it. 
This is also Julia’s first full-fledged React project, so don’t judge too harshly! 
She spent January studying React, learned a lot and greatly improved her skills in web development! 
Further - better, further will be cooler! 
Well, you can send all comments and suggestions for improving the project to: julia.khaipova@gmail.com`;

const header = `Welcome to My Collection website!`;

const Welcome = ({ email, logout }) => {
  const navigate = useNavigate();
  return (
    <>
      <TypographyHeader>{header}</TypographyHeader>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}></Grid>
          <Grid item xs={2} sx={{ alignSelf: 'center' }}>
            <CardMedia component="img" image="1.png" alt="" />
          </Grid>
          <Grid item xs={1} sx={{ alignSelf: 'center' }}>
            <SvgImage
              sx={{ fill: 'white' }}
              component="img"
              image="julia.svg"
              alt=""
            />
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Typography variant="h5">{text}</Typography>
            </Item>
          </Grid>
          <Grid item xs={3} sx={{ alignSelf: 'flex-end' }}>
            <CardMedia component="img" image="2.png" alt="" />
          </Grid>

          <Grid item xs={4} />
          <Grid item xs={2}>
            <Button variant="contained" onClick={() => navigate('/')}>
              Go to home page
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              onClick={() => navigate('/collections')}
            >
              Go to collections page
            </Button>
          </Grid>

          <Grid item xs={1} />

          <Grid item xs={2}>
            <SvgImage
              sx={{ fill: 'white' }}
              component="img"
              image="maya.svg"
              alt=""
            />
          </Grid>

          <Grid item xs={6} />

          <Grid item xs={4}>
            <Item onClick={() => navigate('/')}>{email}</Item>
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" onClick={logout}>
              Logout
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Welcome;
