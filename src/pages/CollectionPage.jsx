import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import ItemsList from '../components/ItemsList';
import AuthContext from '../context/AuthContext';
import TypographyHeader from '../components/TypographyHeader';

const CollectionPage = () => {
  const navigate = useNavigate();
  const { supabase, session } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const { id } = useParams();
  const [collectionInfo, setCollectionInfo] = useState({});

  const handleDeleteCollection = async () => {
    const { error } = await supabase.from('Collections').delete().eq('id', id);
    navigate(`/my-collections`)
  };

  const handleEditCollection = () => {
    navigate(`/edit-collection/${id}`)
  }

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
      .select('id, title, owner:author_id')
      .eq('id', id)
      .single()
      .then((res) => {
        let { data, error } = res;
        setCollectionInfo(data);
      });
  }, []);

  return (
    <>
      <TypographyHeader>{collectionInfo.title}</TypographyHeader>
      {session && session.user.id === collectionInfo.owner && (
        <>
          <Button size="small" onClick={handleEditCollection}>Edit</Button>
          <Button size="small" color="error" onClick={handleDeleteCollection} >
            Delete
          </Button>
        </>
      )}
      <ItemsList items={items}></ItemsList>
    </>
  );
};

export default CollectionPage;
