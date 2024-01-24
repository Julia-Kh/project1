import { useState, useEffect, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Collection from '../components/Collection';
import AuthContext from '../context/AuthContext';

const CollectionsPage = () => {
  const { supabase } = useContext(AuthContext);
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    supabase
      .from('Collections')
      .select(`id, name:title, owner:author_id, poster:img_url, Items(count)`)
      .then((res) => {
        let { data, error } = res;
        setCollections(data);
      });
  }, []);
  return (
    <>
      <div>Collections</div>
      <Grid container spacing={2}>
        {collections.map((collection) => (
          <Collection key={collection.id} {...collection} />
        ))}
      </Grid>
    </>
  );
};

export default CollectionsPage;
