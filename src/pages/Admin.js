import { observer } from 'mobx-react-lite';
import React, {useContext} from 'react';
import { Context } from '..';
import { Button, Container } from '@mui/material';
import ItemList from '../components/UI/list/ItemList';

const Admin = observer( () => {

    const {device} = useContext(Context)

    return (
        <Container
            sx={{ height: '100vh', mt: 2 }}
        >
            <React.Fragment>
                <Button variant="contained"
                    onClick={() => {
                        device.setCategory('devices')
                        device.setLimit(10)
                    }}
                >
                    Devices
                </Button>
                <Button variant="contained" sx={{ mr: 2, ml: 2 }}
                    onClick={() => {
                        device.setCategory('brands')
                    }}
                >
                    Brands
                </Button>
                <Button variant="contained"
                    onClick={() => device.setCategory('types')}
                >
                    Types
                </Button>
            </React.Fragment>
            <ItemList sx={{mt: 2}} />
        </Container>
    );
});

export default Admin;
