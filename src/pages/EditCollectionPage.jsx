import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import TypographyHeader from '../components/TypographyHeader';
import FormCollection from '../components/FormCollection';

const EditCollectionPage = () => {
  const { supabase } = useContext(AuthContext);
  const { id } = useParams();
  const [collectionInfo, setCollectionInfo] = useState(null);

  useEffect(() => {
    supabase
      .from('Collections')
      .select('title, imgUrl:img_url, selectedValue:topic_id')
      .eq('id', id)
      .single()
      .then((res) => {
        let { data, error } = res;
        setCollectionInfo(data);
        if (error) {
          console.log('Error:', error);
        }
      });
  }, []);

  const action = async (formData) => {
    const { data, error } = await supabase
      .from('Collections')
      .update({
        title: formData.title,
        img_url: formData.imgUrl,
        topic_id: formData.selectedValue,
      })
      .eq('id', id)
      .select(); // this is in documentation, I don't know why
    return { data, error };
  };

  return (
    <>
      <TypographyHeader>Edit collection</TypographyHeader>
      {collectionInfo && (
        <FormCollection action={action} initialData={collectionInfo} />
      )}
    </>
  );
};

export default EditCollectionPage;
