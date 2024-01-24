import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import AuthContext from '../context/AuthContext';
import TypographyHeader from '../components/TypographyHeader';
import CollectionsList from '../components/CollectionsList';

const MyCollections = () => {
  const { supabase, session } = useContext(AuthContext);
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    supabase
      .from('Collections')
      .select(`id, name:title, owner:author_id, poster:img_url, Items(count)`)
      .eq('author_id', session.user.id)
      .then((res) => {
        let { data, error } = res;
        setCollections(data);
        console.log(data);
      });
  }, []);

  return (
    <>
      {collections.length === 0 ? (
        <>
          <Typography variant="h5">
            You haven't created any collections yet.
          </Typography>
          <Button onClick={() => navigate('/create-collection')}>
            Create collection
          </Button>
        </>
      ) : (
        <>
          <TypographyHeader>My Collections</TypographyHeader>
          <CollectionsList collections={collections} />
        </>
      )}
    </>
  );
};

export default MyCollections;
