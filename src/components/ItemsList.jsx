import Grid from '@mui/material/Grid';
import Item from './Item';

const ItemsList = (props) => {
    const { items, setOrder } = props;
    // setOrder - ?
    return (
        <Grid container spacing={2}>
            {items.map((item) => (
                <Item key={item.id} setOrder={setOrder} {...item} />
            ))}
        </Grid>
    )
}

export default ItemsList;
