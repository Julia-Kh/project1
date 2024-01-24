import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const ItemPage = () => {
  const navigate = useNavigate();
  const { supabase } = useContext(AuthContext);
  const { id } = useParams();
  const [result, setResult] = useState({});
  const { data: currentData, error: currentError } = result;
  console.log('currentData is: ', currentData);

  useEffect(() => {
    // get item
    supabase
      .from('Items')
      .select(
        'id, name:title, Collections (title), created_at, owner:author_id, poster:img_url'
      )
      .eq('id', id)
      .single()
      .then((res) => {
        let { data, error } = res;
        console.log(res);
        setResult({ data, error });
      });
  }, []);
  // console.log('result is: ', result);
  if (currentError) {
    navigate('/error');
  }

  return (
    <>
      <div>ItemPage {id}</div>
      {currentData ? (
        <>
          <div>Title: {currentData.name}</div>
          {/* <img src={currentData.poster} /> */}
          <div>Collection: {currentData.Collections.title}</div>
          <div>Created at: {currentData.created_at}</div>
          <div>Owner: {currentData.owner}</div>
        </>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};

export default ItemPage;
