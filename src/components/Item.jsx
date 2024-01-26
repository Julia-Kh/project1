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

const Item = (props) => {
  const { name, poster, owner, collection, id } = props;
  const navigate = useNavigate();
  const defaultImgUrl =
    'https://images.unsplash.com/photo-1553949345-eb786bb3f7ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <Grid item xs={12} md={3}>
      <Card
        sx={{ height: '100%', cursor: 'pointer' }}
        onClick={() => navigate(`/items/${id}`)}
      >
        <CardMedia
          component="img"
          image={poster ? poster : defaultImgUrl}
          alt={name}
          title={name}
          height="140"
        />
        <CardContent>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body1">Collection: {collection}</Typography>
          <Typography variant="body1">Author: {owner}</Typography>
        </CardContent>
        <CardActions>
        </CardActions>
      </Card>
    </Grid>
  );
};
// body1 - span
// Button variant="text" - вариант отображения кнопки
export default Item;
