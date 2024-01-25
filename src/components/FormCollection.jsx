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

const MyForm = ({
  action,
  initialData = { title: '', description: '', imgUrl: '', selectedValue: '' },
}) => {
  const { supabase } = useContext(AuthContext);
  const [topics, setTopics] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    const fetchTopics = async () => {
      let { data: Topics, error } = await supabase.from('Topics').select('*');
      setTopics(Topics);
    };
    fetchTopics();
  }, []);

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
    const { data, error } = await action(formData);
    // todo: handle errors
    if (error) {
      console.log('error is', error);
    } else {
      navigate(`/collections/${data[0].id}`);
    }
  };

  return (
    <>
      {topics ? (
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
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};

export default MyForm;
