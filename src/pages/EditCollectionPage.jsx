import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import TypographyHeader from '../components/TypographyHeader';
import FormCollection from '../components/FormCollection';

const EditCollectionPage = () => {
  const { supabase, session } = useContext(AuthContext);
  const { id } = useParams();

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
      <FormCollection action={action} />
    </>
  );
};

export default EditCollectionPage;
