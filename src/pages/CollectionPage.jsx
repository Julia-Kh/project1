import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import ItemsList from '../components/ItemsList';
import AuthContext from '../context/AuthContext';
import TypographyHeader from '../components/TypographyHeader';

const CollectionPage = () => {
  const { supabase } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const { id } = useParams();
  const [collectionInfo, setCollectionInfo] = useState({});

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

  useEffect(() => {
    supabase
      .from('Collections')
      .select(
        'id, title'
      )
      .eq('id', id)
      .single()
      .then((res) => {
        let { data, error } = res;
        setCollectionInfo( data );
      });
  }, []);

  return (
    <>
      <TypographyHeader>{collectionInfo.title}</TypographyHeader>
      <ItemsList items={items}></ItemsList>
    </>
  );
};

export default CollectionPage;
