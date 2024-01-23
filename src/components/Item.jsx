import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';

const Item = (props) => {
  const { name, poster, owner, collection } = props;

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
          <Typography variant="h6">
            {name}
          </Typography>
          <Typography variant="body1">Collection: {collection}</Typography>
          <Typography variant="body1">Author: {owner}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="text">Open</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
// body1 - span
// Button variant="text" - вариант отображения кнопки
export default Item;
