import { useState, useEffect, useContext } from 'react';
import ItemsList from './ItemsList';
import AuthContext from '../context/AuthContext';

const LastItems = () => {
  const { supabase } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  useEffect(() => {
    // get last 5 items
    supabase
      .from('Items')
      .select(
        'id, name:title, Collections (title), created_at, owner:author_id, poster:img_url'
      )
      .order('created_at', { ascending: false }) // сортировка
      .limit(5)
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
      <div>Last Items</div>
      <ItemsList items={items}></ItemsList>
    </>
  );
};

export default LastItems;
