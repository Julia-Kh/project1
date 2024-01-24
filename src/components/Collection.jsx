import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Collection = (props) => {
  const { name, poster, owner, id } = props;
  const navigate = useNavigate();
  const defaultImgUrl =
    'https://images.unsplash.com/photo-1618598498622-38a055d15041?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <Grid item xs={12} md={3}>
      <Card sx={{ height: '100%' }}>
        <CardMedia
          component="img"
          image={poster ? poster : defaultImgUrl}
          alt={name}
          title={name}
          height="140"
        />
        <CardContent>
          <Typography variant="h6" component="h5">
            {name}
          </Typography>
          <Typography variant="body1">Author: {owner}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="text" onClick={() => navigate(`/collections/${id}`)}>
            Open
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Collection;
