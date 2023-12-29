import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";

const Item = (props) => {
    const { name, setOrder, poster, owner, collection } = props;

    return (
        <Grid item xs={12} md={3}>
            <Card
            sx={{height: '100%'}}>
                <CardMedia
                    component="img"
                    image={poster}
                    alt={name}
                    title={name}
                    height="140"
                />
                <CardContent>
                    <Typography
                    variant="h6"
                    component="h5"
                    >{name}</Typography>
                    <Typography variant="body1">Collection: {collection}</Typography>
                    <Typography variant="body1">Author: {owner}</Typography>
                    </CardContent>
                    <CardActions>
                    <Button
                    variant="text"
                        onClick={() =>
                            setOrder({
                                id: props.id,
                                name: props.name,
                                price: props.price,
                            })
                        }
                    >
                        Open
                    </Button>
                    </CardActions>
            </Card>
        </Grid>
    );
};

export default Item;
