import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import CollectionsList from './CollectionsList';

const BiggestCollections = () => {
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    // get 5 biggest collections
    supabase
      .from('Collections')
      .select(`id, name:title, owner:author_id, poster:img_url, Items(count)`)
      .then((res) => {
        let { data, error } = res;
        let arrOfData = data.map((value, key) => {
          value.countOfItems = value.Items[0].count;
          return value;
        });
        arrOfData.sort((a, b) => b.countOfItems - a.countOfItems);
        arrOfData = arrOfData.slice(0, 5);

        // set collections
        setCollections(arrOfData);
      });
  }, []);
  return (
    <>
      <div>BiggestCollections</div>
      <CollectionsList collections={collections}></CollectionsList>
    </>
  );
};

export default BiggestCollections;
