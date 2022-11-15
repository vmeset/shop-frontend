import { observer } from 'mobx-react-lite';
import React, {useContext} from 'react';
import { Context } from '../..';
import { Box, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const Order = observer( () => {

    const {device} = useContext(Context)

    if(!device.order.length) return <ListItem>Your cart is empty</ListItem>

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell>Label</TableCell>
                        <TableCell align="right">Qty.</TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {device.order.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell>{item.label}</TableCell>
                            <TableCell align="right" sx={{p: 0}}>
                                 <RemoveIcon fontSize='1rem' onClick={() => device.lowQuantity(item)} />
                                <Box component="span" sx={{verticalAlign: 'center', fontSize: '1rem'}}>{item.quantity}</Box>
                                <AddIcon fontSize='1rem' onClick={() => device.setToOrder(item)} />
                            </TableCell>
                            <TableCell align="right">{item.price*item.quantity}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="right">
                            {device.order.reduce((acc, item) => {
                                return acc + item.price * item.quantity;
                            }, 0)} $
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
});

export default Order;