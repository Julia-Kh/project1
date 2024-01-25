import { useState, useEffect, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Item from '../components/Item';
import AuthContext from '../context/AuthContext';
import TypographyHeader from '../components/TypographyHeader';

const ItemsPage = () => {
  const { supabase } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  useEffect(() => {
    supabase
      .from('Items')
      .select(
        'id, name:title, Collections (title), created_at, owner:author_id, poster:img_url'
      )
      .then((res) => {
        let { data, error } = res;
        setItems(data);
      });
  }, []);
  return (
    <>
      <TypographyHeader>Items</TypographyHeader>
      <Grid container spacing={2}>
        {items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </Grid>
    </>
  );
};

export default ItemsPage;
