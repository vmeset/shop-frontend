import React, {useContext, useState} from 'react';
import {AppBar, Toolbar, Typography, Button, styled, Badge, Menu, MenuItem, Autocomplete, FormControlLabel, Switch, Link} from '@mui/material'
import TextField from '@mui/material/TextField';
import { Computer } from "@mui/icons-material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { Box } from '@mui/system';

const Footer = observer (({mode, setMode}) => {

    const {user} = useContext(Context)
    const {device} = useContext(Context)
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(false);

    const StyledToolbar = styled(Toolbar)({
        display: "flex",
        justifyContent: 'center',
        alignItems: "center"
    })

    return (
        <AppBar position="static" color='default'>
            <StyledToolbar>
                <Box sx={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                    <Typography 
                        sx={{ display: { xs: "none", sm: "block" }, cursor: "pointer" }}
                    >
                        © 2022 MyShop project by <Link href="https://github.com/vmeset">Vmeset</Link>
                    </Typography>
                    <Computer sx={{ display: { xs: "block", sm: "none" } }} />
                </Box>
            </StyledToolbar>
        </AppBar>
    );
});

export default Footer;