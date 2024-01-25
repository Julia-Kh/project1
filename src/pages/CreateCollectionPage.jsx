import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import TypographyHeader from '../components/TypographyHeader';
import FormCollection from '../components/FormCollection';

const CreateCollectionPage = () => {
  const { supabase, session } = useContext(AuthContext);

  const action = async (formData) => {
    const { data, error } = await supabase
      .from('Collections')
      .insert([
        {
          title: formData.title,
          img_url: formData.imgUrl,
          topic_id: formData.selectedValue,
          author_id: session.user.id,
        },
      ])
      .select(); // this is in documentation, I don't know why
    return { data, error };
  };

  return (
    <>
      <TypographyHeader>Create collection</TypographyHeader>
      <FormCollection action={action} />
    </>
  );
};

export default CreateCollectionPage;
