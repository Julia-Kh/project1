import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import TypographyHeader from '../components/TypographyHeader';
import FormItem from '../components/FormItem';

const CreateItemPage = () => {
  const { supabase, session } = useContext(AuthContext);

  const action = async (formData) => {
    const { data, error } = await supabase
      .from('Items')
      .insert([
        {
          title: formData.title,
          img_url: formData.imgUrl,
          collection_id: formData.selectedValue,
          description: formData.description,
          author_id: session.user.id,
        },
      ])
      .select(); // this is in documentation, I don't know why
    return { data, error };
  };

  return (
    <>
      <TypographyHeader>Create item</TypographyHeader>
      <FormItem action={action} />
    </>
  );
};

export default CreateItemPage;