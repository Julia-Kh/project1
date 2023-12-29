import Grid from '@mui/material/Grid';
import Collection from './Collection';

const CollectionsList = (props) => {
    const { collections, setOrder } = props;
    // setOrder - ?
    return (
        <Grid container spacing={2}>
            {collections.map((collection) => (
                <Collection key={collection.id} setOrder={setOrder} {...collection} />
            ))}
        </Grid>
    )
}

export default CollectionsList;