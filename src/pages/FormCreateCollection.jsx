import React, { useEffect, useState, useContext } from 'react';
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';
import AuthContext from '../context/AuthContext';

const MyForm = () => {
  const { supabase } = useContext(AuthContext);
  const [topics, setTopics] = useState([]);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Действия с отправленными данными
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}></Grid>
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
  );
};

export default MyForm;
