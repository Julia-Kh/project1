import Grid from '@mui/material/Grid';
import Item from './Item';

const ItemsList = ({ items }) => {
    return (
        <Grid container spacing={2}>
            {items.map((item) => (
                <Item key={item.id} {...item} />
            ))}
        </Grid>
    )
}

export default ItemsList;
