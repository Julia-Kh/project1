import { useState, useEffect, useContext } from 'react';
import Typography from '@mui/material/Typography';
import ItemsList from './ItemsList';
import AuthContext from '../context/AuthContext';
import './LastItems.css'

const LastItems = () => {
  const { supabase } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  useEffect(() => {
    // get last 8 items
    supabase
      .from('Items')
      .select(
        'id, name:title, Collections (title), created_at, owner:author_id, poster:img_url'
      )
      .order('created_at', { ascending: false })
      .limit(8)
      .then((res) => {
        let { data, error } = res;
        console.log(data, error);
        const data2 = data.map((value) => ({
          ...value,
          collection: value.Collections.title,
        }));
        setItems(data2);
      });
  }, []);
  return (
    <>
      <Typography className='textLastItems' variant="h3">Last Items</Typography>
      <ItemsList items={items}></ItemsList>
    </>
  );
};

export default LastItems;
