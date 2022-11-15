import React, {useContext} from 'react';
import {Context} from '../index'
import { observer } from 'mobx-react-lite';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListSubheader from '@mui/material/ListSubheader';

const TypeBar = observer( () => {

    const {device} = useContext(Context)

    return (
        <Box sx={{ maxWidth: 360, bgcolor: 'background.paper', mt: 1, mr: 3,
            display: {xs: 'none', sm: 'block'}
        }}>
            <List>
                <ListSubheader component="div" id="nested-list-subheader">
                    Categories
                </ListSubheader>
                <Divider />
                {device.types.map(type => 
                    <ListItem 
                        disablePadding key={type._id}
                        selected={type._id === device.selectedType._id ? true : false}
                    >
                        <ListItemButton
                            onClick={() => device.setSelectedType(type)}
                        >
                            <ListItemText  
                                primary={type.name}
                            />
                        </ListItemButton>
                    </ListItem>
                )}
                <Divider />
            </List>
        </Box>
    );
});

export default TypeBar;