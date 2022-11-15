import { Container, Stack } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar';
import { observer } from 'mobx-react-lite';
import DeviceList from '../components/DeviceList';
import { Box } from '@mui/system';
import Paginator from '../components/UI/paginator/Paginator';
import { Context } from '..';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI';

const Shop = observer( () => {

  const {device} = useContext(Context)

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
    fetchDevices(null, null, 1, 9).then(data => {
      device.setDevices(data.devices)
      device.setTotalCount(data.totalCount)
    })
  }, [])

  useEffect(() => {
    fetchDevices(device.selectedType._id, device.selectedBrand._id, device.page, device.limit).then(data => {
      device.setDevices(data.devices)
      device.setTotalCount(data.totalCount)
    })
  }, [device.selectedType._id, device.selectedBrand._id, device.page])
  
  return (
    <Container sx={{ minHeight: '100vh' }}>
      <Stack direction="row" spacing={2} justifyContent="flex-start">
        <TypeBar />
        <Box>
          <BrandBar />
          <DeviceList />
          <Paginator />
        </Box>
      </Stack>
    </Container>
  );
});

export default Shop;