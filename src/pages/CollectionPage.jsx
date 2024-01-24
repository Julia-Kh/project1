import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import ItemsList from '../components/ItemsList';
import AuthContext from '../context/AuthContext';

const CollectionPage = () => {
  const { supabase } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // get items
    supabase
      .from('Items')
      .select(
        'id, name:title, Collections (title), created_at, owner:author_id, poster:img_url'
      )
      .eq('collection_id', id)
      .order('created_at', { ascending: false }) // сортировка
      .then((res) => {
        let { data, error } = res;
        // todo: handle errors
        // console.log(data, error);
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

export default CollectionPage;
