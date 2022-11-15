import React, {useContext} from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { DEVICE_ROUTE } from '../utils/consts';

const DeviceCard = observer( ({item}) => {

    const {device} = useContext(Context)
    const navigate = useNavigate()

    return (
        <Grid item xs={12} md={4}>
            <Card onClick={() => navigate(DEVICE_ROUTE + '/' + item._id)}>
                <CardMedia
                    component="img"
                    height="220"
                    image={process.env.REACT_APP_API_URL + item.img}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {item.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
                <CardActions>
                    <Stack direction="row" spacing={5} divider={<Divider orientation="vertical" flexItem />}
                        onClick={e => e.stopPropagation()}
                    >
                        <Button size="small" sx={{ml: 5}} onClick={() => device.setToOrder(item)}>Buy</Button>
                        <Button disabled size="small">{item.price}$</Button>
                    </Stack>
                </CardActions>
            </Card>
        </Grid>
    );
});

export default DeviceCard;

