import React, { useEffect, useState, useContext } from 'react';
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles.css'

const MyForm = () => {
  const { supabase, session } = useContext(AuthContext);
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTopics = async () => {
      let { data: Topics, error } = await supabase.from('Topics').select('*');
      setTopics(Topics);
    };
    fetchTopics();
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
      .from('Collections')
      .insert([
        {
          title: formData.title,
          description: formData.description,
          img_url: formData.imgUrl,
          topic_id: formData.selectedValue,
          author_id: session.user.id,
        },
      ])
      .select();
    // todo: handle errors
    if (error) {
      console.log('error is', error);
    } else {
      console.log('data is', data);
      navigate(`/collections/${data[0].id}`);
    }
  };

  return (
    <>
      <Typography className='my_header' variant="h3">Create collection</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              maxRows={4}
            />
            <TextField
              label="Image url"
              name="imgUrl"
              value={formData.imgUrl}
              onChange={handleInputChange}
              fullWidth
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
                {topics.map((topic) => (
                  <MenuItem value={topic.id} key={topic.id}>
                    {topic.title}
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
