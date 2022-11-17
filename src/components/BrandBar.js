import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { Context } from '..';

const BrandBar = observer( () => {

    const {device} = useContext(Context)

    return (
        <Box
            sx={{
                display: 'block',
                flexDirection: 'column',
                alignItems: 'flex-start',
            }}
        >
            <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{mt: 3}}>
                <Button 
                    color={!device.selectedBrand._id ? "primary" : 'inherit'}
                    size='small'
                    variant={!device.selectedBrand._id ? "contained" : 'outlined'}
                    onClick={() => {
                        device.setSelectedBrand('')
                        device.setPage(1)
                    }}
                >
                    ALL
                </Button>
                {device.brands.map(brand => 
                    <Button 
                        color={brand._id === device.selectedBrand._id ? "primary" : 'inherit'}
                        size='small'
                        variant={brand._id === device.selectedBrand._id ? "contained" : 'outlined'} 
                        key={brand._id}
                        onClick={() => {
                            device.setSelectedBrand(brand)
                            device.setPage(1)
                        }}
                    >
                        {brand.name}
                    </Button>
                )}
            </ButtonGroup>
        </Box>
    );
});

export default BrandBar;