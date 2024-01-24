import Grid from '@mui/material/Grid';
import Collection from './Collection';

const CollectionsList = (props) => {
  const { collections } = props;
  return (
    <Grid container spacing={2}>
      {collections.map((collection) => (
        <Collection key={collection.id} {...collection} />
      ))}
    </Grid>
  );
};

export default CollectionsList;
