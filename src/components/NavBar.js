import React, {useContext, useState} from 'react';
import {AppBar, Toolbar, Typography, Button, styled, Badge, Menu, MenuItem, Autocomplete, FormControlLabel, Switch} from '@mui/material'
import TextField from '@mui/material/TextField';
import { Computer } from "@mui/icons-material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { Box } from '@mui/system';

const NavBar = observer (({mode, setMode, handleCart}) => {

    const {user} = useContext(Context)
    const {device} = useContext(Context)
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(false);

    const StyledToolbar = styled(Toolbar)({
        display: "flex",
        justifyContent: "space-between",
        gap: 20
    })

    const Icons = styled(Box)(() => ({
        display: "flex",
        alignItems: "center",
        gap: 20
      }));

    const handleChange = (event) => {
        setChecked(event.target.checked);
        setMode(mode === 'light' ? 'dark' : 'light')
    };

    const onInputChange = (event, value) => {
        device.setQuery(value)
    }
    
    const onSelectTag = (e, value) => {
        if(value) {
            return device.setQuery(value.label)
        }
        return device.setQuery('')
    }

    const logout = () => {
        user.setIsAuth(false)
        user.setUser({})
        navigate(LOGIN_ROUTE)
        localStorage.removeItem('token')
        setOpen(false)
    }

    return (
        <AppBar position="static" color='default'>
            <StyledToolbar>
                <Box sx={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                    <Typography 
                        variant="h6" 
                        sx={{ display: { xs: "none", sm: "block" }, cursor: "pointer" }}
                        onClick={() => navigate(SHOP_ROUTE)}
                    >
                        MyShop
                    </Typography>
                    <FormControlLabel sx={{display: {xs: 'none', sm: 'flex'}}} 
                        control={<Switch color="primary"
                            onChange={handleChange}
                            checked={checked}
                        />} label="Dark theme"
                        
                    />
                    <Computer sx={{ display: { xs: "block", sm: "none" } }}
                        onClick={() => navigate(SHOP_ROUTE)}
                    />
                </Box>
                <Autocomplete
                    disablePortal
                    options={device.devices}
                    sx={{ width: 400, pt: '0', borderRadius: '4px' }}
                    onChange={onSelectTag}
                    onInputChange={onInputChange}
                    renderInput={(params) => <TextField {...params} 
                        size='small'
                        label="search"
                    />}
                />
                <Icons>
                    <Button color="inherit"
                        onClick={() => navigate(ADMIN_ROUTE)}
                    >
                        {user.user.role === 'ADMIN' ? 'ADMIN' : null}    
                    </Button>
                    {user.isAuth
                        ? 
                            <>
                                <Badge badgeContent={device.order.length} color="error">
                                    <ShoppingCartIcon sx={{ cursor: "pointer" }} 
                                        onClick={handleCart}
                                    />
                                </Badge>
                                <Typography variant="span"
                                    onClick={e => setOpen(true)}
                                    sx={{ cursor: "pointer", display: {xs: 'none', md: 'flex'} }}
                                >
                                    { user.user.username
                                        ?
                                            user.user.username.toUpperCase()
                                        :
                                            " "
                                    }
                                </Typography>
                            </>
                        : 
                            <Button color="inherit"
                                    onClick={() => navigate(LOGIN_ROUTE)}
                            >
                                Login
                            </Button>
                    }
                    
                </Icons>
            </StyledToolbar>
            <Menu
                open={open}
                onClose={(e) => setOpen(false)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem onClick={() => logout()}>Sign out</MenuItem>
            </Menu>
        </AppBar>
    );
});

export default NavBar;