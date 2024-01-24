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

  return (
    <Grid item xs={12} md={3}>
      <Card sx={{ height: '100%' }}>
        <CardMedia
          component="img"
          image={poster}
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
