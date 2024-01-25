import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import TypographyHeader from '../components/TypographyHeader';
import FormItem from '../components/FormItem';

const EditItemPage = () => {
  const { supabase } = useContext(AuthContext);
  const { id } = useParams();
  const [itemInfo, setItemInfo] = useState(null);

  useEffect(() => {
    supabase
      .from('Items')
      .select('title, description, imgUrl:img_url, selectedValue:collection_id')
      .eq('id', id)
      .single()
      .then((res) => {
        let { data, error } = res;
        setItemInfo(data);
      });
  }, []);

  const action = async (formData) => {
    const { data, error } = await supabase
      .from('Items')
      .update({
        title: formData.title,
        description: formData.description,
        img_url: formData.imgUrl,
        collection_id: formData.selectedValue,
      })
      .eq('id', id)
      .select(); // this is in documentation, I don't know why
    return { data, error };
  };

  return (
    <>
      <TypographyHeader>Edit item</TypographyHeader>
      {itemInfo && <FormItem action={action} initialData={itemInfo} />}
    </>
  );
};

export default EditItemPage;
