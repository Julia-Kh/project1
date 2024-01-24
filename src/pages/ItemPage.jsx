import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AuthContext from '../context/AuthContext';

const ItemPage = () => {
  const navigate = useNavigate();
  const { supabase, session } = useContext(AuthContext);
  const { id } = useParams();
  const [result, setResult] = useState({});
  const { data: currentData, error: currentError } = result;

  useEffect(() => {
    supabase
      .from('Items')
      .select(
        'id, name:title, Collections (title), created_at, owner:author_id, poster:img_url, description'
      )
      .eq('id', id)
      .single()
      .then((res) => {
        let { data, error } = res;
        console.log(res);
        setResult({ data, error });
      });
  }, []);
  if (currentError) {
    navigate('/error');
  }

  return currentData ? (
    <Card sx={{ maxWidth: 800, display: 'flex' }}>
      <CardMedia
        component="img"
        alt=""
        height="400"
        image={currentData.poster}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {currentData.name}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="div">
            Collection: {currentData.Collections.title}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="div">
            Owner: {currentData.owner}
          </Typography>
          <Typography gutterBottom variant="subtitle2" component="div">
            Created at: {currentData.created_at}
          </Typography>
          {currentData.description && (
            <Typography variant="body2" color="text.secondary">
              {currentData.description}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button size="small">Edit</Button>
          <Button size="small" color="error">
            Delete
          </Button>
        </CardActions>
      </Box>
    </Card>
  ) : (
    <div>loading...</div>
  );
};

export default ItemPage;
