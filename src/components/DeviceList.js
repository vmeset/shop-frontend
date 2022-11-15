import { Alert, Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, {useContext} from 'react';
import { Context } from '..';
import { useDevices } from '../hooks/useDevices';
import DeviceCard from './DeviceCard';

const DeviceList = observer( () => {

    const {device} = useContext(Context)
    const searchedDevices = useDevices(device.devices, device.query)

    return (
        <Grid container spacing={2} mt={1} >
            {!!searchedDevices.length ?
                searchedDevices.map(item => 
                    <DeviceCard key={item._id} item={item} />
                )
                :
                <Alert severity="warning" sx={{ml: 2, mt: 2}}>
                    Подходящих устройств не найдено, попробуйте изменить условия поиска
                </Alert>
            }
        </Grid>
    );
});

export default DeviceList;