import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import TypographyHeader from '../components/TypographyHeader';
import FormCollection from '../components/FormCollection';

const EditCollectionPage = () => {
  const { supabase, session } = useContext(AuthContext);
  const { id } = useParams();
  const [collectionInfo, setCollectionInfo] = useState({});

  useEffect(() => {
    supabase
      .from('Collections')
      .select('title, description, img_url, topic_id')
      .eq('id', id)
      .single()
      .then((res) => {
        let { data, error } = res;
        setCollectionInfo(data);
      });
  }, []);

  const initialData = {
    title: collectionInfo.title,
    description: collectionInfo.description,
    imgUrl: collectionInfo.img_url,
    selectedValue: collectionInfo.topic_id,
  };

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
      {collectionInfo.title && <FormCollection action={action} initialData={initialData} />}
    </>
  );
};

export default EditCollectionPage;
