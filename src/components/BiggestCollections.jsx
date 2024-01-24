import { useState, useEffect, useContext } from 'react';
import CollectionsList from './CollectionsList';
import AuthContext from '../context/AuthContext';
import TypographyHeader from './TypographyHeader';

const BiggestCollections = () => {
  const { supabase } = useContext(AuthContext);
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    // get 8 biggest collections
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
        arrOfData = arrOfData.slice(0, 8);

        // set collections
        setCollections(arrOfData);
      });
  }, []);
  return (
    <>
      <TypographyHeader>
        Biggest Collections
      </TypographyHeader>
      <CollectionsList collections={collections}></CollectionsList>
    </>
  );
};

export default BiggestCollections;
