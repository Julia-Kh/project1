import React, { useEffect, useState, useContext } from 'react';
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import TypographyHeader from '../components/TypographyHeader';

const MyForm = () => {
  const { supabase, session } = useContext(AuthContext);
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCollections = async () => {
      let { data: Collections, error } = await supabase
        .from('Collections')
        .select('*')
        .eq('author_id', session.user.id);
      setCollections(Collections);
    };
    fetchCollections();
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imgUrl: '',
    selectedValue: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      selectedValue: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Действия с отправленными данными
    const { data, error } = await supabase
      .from('Items')
      .insert([
        {
          title: formData.title,
          img_url: formData.imgUrl,
          collection_id: formData.selectedValue,
          author_id: session.user.id,
          description: formData.description,
          // tag_id можно добавить
        },
      ])
      .select();
    // todo: handle errors
    if (error) {
      console.log('error is', error);
    } else {
      console.log('data is', data);
      navigate(`/items/${data[0].id}`);
    }
  };

  return (
    <>
      <TypographyHeader>Create item</TypographyHeader>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Image url"
              name="imgUrl"
              value={formData.imgUrl}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              maxRows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Выберите значение</InputLabel>
              <Select
                value={formData.selectedValue}
                onChange={handleSelectChange}
                required
              >
                {collections.map((collection) => (
                  <MenuItem value={collection.id} key={collection.id}>
                    {collection.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Отправить
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default MyForm;
