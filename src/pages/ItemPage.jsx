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
  const defaultImgUrl =
    'https://images.unsplash.com/photo-1553949345-eb786bb3f7ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  const handleDeleteItem = async () => {
    const { error } = await supabase.from('Items').delete().eq('id', id);
    navigate(`/collections/${currentData.Collections.id}`)
  };

  const handleEditItem = () => {
    navigate(`/edit-item/${id}`)
  }

  useEffect(() => {
    supabase
      .from('Items')
      .select(
        'id, name:title, Collections (title, id), created_at, owner:author_id, poster:img_url, description'
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
        image={currentData.poster ? currentData.poster : defaultImgUrl}
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
          {session && session.user.id === currentData.owner && (
            <>
              <Button size="small" onClick={handleEditItem}>Edit</Button>
              <Button size="small" color="error" onClick={handleDeleteItem}>
                Delete
              </Button>
            </>
          )}
        </CardActions>
      </Box>
    </Card>
  ) : (
    <div>loading...</div>
  );
};

export default ItemPage;
