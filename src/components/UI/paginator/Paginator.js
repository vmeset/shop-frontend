import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Context } from '../../..';

const Paginator = observer( () => {

    const {device} = useContext(Context)

    const pagesCount = Math.ceil(device.totalCount / device.limit)
    const handleChange = (event, value) => {
        device.setPage(value)
    };

    return (
        <Stack spacing={2} sx={{mt: 2}}>
            {!!pagesCount ?
                <Pagination count={pagesCount} page={device.page} onChange={handleChange} />
                :
                <></>
            }
        </Stack>
    );
});

export default Paginator;