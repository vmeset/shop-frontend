import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, {useContext} from 'react';
import { Context } from '../..';
import Order from './Order';

const Basket = observer( ({cartOpen, closeCart}) => {

    const {device} = useContext(Context)

    return (
        <Drawer
            anchor='right'
            open={cartOpen}
            onClose={closeCart}
        >
            <List sx={{width: 300}}>
                <ListItem>
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText>Cart</ListItemText>
                </ListItem>
                <Divider />
                <Order />
            </List>
        </Drawer>
    );
});

export default Basket;